const emptyresultsText = document.getElementById("empty-results-text")
const calculationId= document.getElementById("calculation")


document.querySelectorAll(".mortgage-type").forEach(input => {
    input.addEventListener("change", function() {
        document.querySelectorAll(".radio-inputs").forEach(div => {
           div.classList.remove("selected") 

        })

        if(this.checked) {
            this.parentElement.classList.add("selected")
        }
    })
})


document.getElementById("calculate-btn").addEventListener("click", () =>{
    const amount = parseFloat(document.getElementById("mortgage-amount").value)
    const term = parseFloat(document.getElementById("mortgage-term").value)
    const rate = parseFloat(document.getElementById("Interest-rate").value)/100
    const mortgageType = document.querySelector("input[name='mortgage-type']:checked")

    let isValid = true

    document.querySelectorAll(".input-div").forEach(el=>{
        el.classList.remove('error')
    })

    if (isNaN(amount)|| amount <= 0){
        document.getElementById('alert-for-amount').style.display="block"
        document.getElementById('input-div-id').classList.add('error')
        isValid = false
    } else{
        document.getElementById('alert-for-amount').style.display = 'none'
    }

    if (isNaN(term)|| amount <= 0){
        document.getElementById('alert-for-term').style.display="block"
        document.getElementById('input-div2').classList.add('error')
        isValid = false
    } else{
        document.getElementById('alert-for-term').style.display = 'none'
    }

    if (isNaN(rate)|| amount <= 0){
        document.getElementById('rate-alert').style.display="block"
        document.getElementById('input-div3').classList.add('error')
        isValid = false
    } else{
        document.getElementById('rate-alert').style.display = 'none'
    }

    if(!mortgageType){
       document.getElementById('type-alert').style.display="block"
       document.querySelectorAll('.radio-inputs').forEach(el => {
         el.classList.add('error')
       })
       isValid = false
    } else{
        document.getElementById('type-alert').style.display="none"
        document.querySelectorAll('.radio-inputs').forEach(el =>{
            el.classList.remove('error')
        })
    }

    if(isValid) {
        let monthlyPayment = 0
        let totalRePayment = 0


        emptyresultsText.classList.add('hide')
        calculationId.classList.add('show')

        if (mortgageType.value ==='repayment'){
            const monthlyRate = rate / 12
            const n =  term * 12
            monthlyPayment = (amount * monthlyRate) / (1- Math.pow((1 + monthlyRate), -n))
            totalRePayment = monthlyPayment * n
        } else if (mortgageType.value === 'interest-only'){
            monthlyPayment = (amount * rate) /12
            totalRePayment = monthlyPayment * term * 12
        }

        document.getElementById("monthly-result").innerText = `$${monthlyPayment.toFixed(2)}`
        document.getElementById("total-result").innerText = `$${totalRePayment.toFixed(2)}`

    } else{
        document.getElementById("monthly-result").innerText = ""
        document.getElementById("total-result").innerText = ""

        emptyresultsText.classList.remove('hide')
        calculationId.classList.remove('show')

    }
})

document.getElementById("clear").addEventListener('click', () => {
    document.getElementById('mortgage-form').reset()
    document.getElementById('monthly-result').innerText = ""
    document.getElementById('total-result').innerText = ""
    document.querySelectorAll(".alert").forEach(one => {
        one.style.display = 'none'
    })

    emptyresultsText.classList.remove('hide')
    calculationId.classList.remove('show')

    document.querySelectorAll('.radio-input').forEach(div => {
        div.classList.remove('selected')
    })

    document.querySelectorAll('.input-div').forEach(el => {
        el.classList.remove('error')
    })


})

document.querySelectorAll('.alert').forEach(one => {
    one.style.display = 'none'
})