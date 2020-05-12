
document.getElementById('loan-form').addEventListener('submit',calculateResults);


function calculateResults(e)
{
    e.preventDefault();

    //UI variables ( input fields)

    const amount=document.getElementById('amount');
    const interest=document.getElementById('interest');
    const years=document.getElementById('years');
    
    //UI variables ( result fields)

    const monthlyPayment=document.getElementById('monthly-payment');
    const totalPayment=document.getElementById('total-payment');
    const totalInterest=document.getElementById('total-interest');

    const principal=parseFloat(amount.value);
    const calculateInterest=parseFloat(interest.value)/100/12;
    const calculatedPayments=parseFloat(years.value)*12;

    // monthly payment
    const x=Math.pow(1+calculateInterest,calculatedPayments);
    const monthly=(principal*x*calculateInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthlyPayment.value=monthly.toFixed(2);
        totalPayment.value=(monthly*calculatedPayments).toFixed(2);
        totalInterest.value=((monthly* calculatedPayments)- principal).toFixed(2);
    }
    else{
        showError("Pleas check your numbers !");
    }
}

function showError(error)
{
    const card=document.querySelector('.card');
    const heading=document.querySelector ('.heading');

    const errDiv=document.createElement('div');
    errDiv.className="alert alert-danger";
    errDiv.textContent=error;

    card.insertBefore(errDiv,heading);

    setTimeout(clearError,3000);
}

function clearError()
{
    document.querySelector('.alert').remove();
}

