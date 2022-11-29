async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    const resetButton = document.querySelector('#reset-button');

    const response = await fetch('http://localhost:9001/counter');

    const result = await response.json();
    
    let countValue = result.value;
    let resetCount = countValue;

    function increment(){
        countValue++;
        countContainer.textContent = countValue;
        changeNum()
    }

    function decrement(){
        countValue--;
        countContainer.textContent = countValue;
        changeNum()
    }

    function reset(){
        countValue = resetCount;
        countContainer.textContent = countValue;
        changeNum()
    }
    
    async function changeNum(){
        await fetch('http://localhost:9001/counter', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'value': `${countValue}`
                })
            })
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    resetButton.addEventListener('click', reset);
    countContainer.textContent = countValue;
}
main()