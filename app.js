let chartContainer = document.querySelector('.chart_container');
let submitBtn = document.querySelector(".submit_btn");


submitBtn.addEventListener("click", (e) => {
    inputDetails();

});

function inputDetails() {
    let inputProductName = document.querySelector("#prod").value;
    let inputCategory = document.querySelector("#category").value;
    if (inputProductName && inputCategory) {
        fetchData(inputCategory);
        chartContainer.style.display = 'block';
    }
    else {
        alert("Please enter a product name!!!");
    }
}

function fetchData(categoryIndex) {
    async function fetchData() {
        const url = 'http://127.0.0.1:5500/jsonData.json';
        const response = await fetch(url);
        const datapoints = await response.json();
        return datapoints;
    }

    fetchData().then(datapoints => {
        const products = datapoints.maindata[categoryIndex].categorydata.map(
            function (index) {
                return index.brand
            });

        const productReview = datapoints.maindata[categoryIndex].categorydata.map(
            function (index) {
                return index.review
            });

        bgcColor = [];

        productReview.forEach(element => {
            if (element < 35)
                bgcColor.push(worstColor);
            else if (element > 30 && element < 70)
                bgcColor.push(avgColor);
            else
                bgcColor.push(bestColor);
        });


        // const legendName = datapoints.maindata.map(
        //     function (index) {
        //         return index.category
        //     });

        // console.log(products);
        myChart.config.data.labels = products;
        myChart.config.data.datasets[0].data = productReview;
        // myChart.config.data.datasets[0].label = legendName;
        myChart.config.data.datasets[0].backgroundColor = bgcColor;
        myChart.update();
    })
};


let worstColor = 'red', avgColor = 'yellow', bestColor = 'green';

const data = {
    labels: ['Puma', 'Campus', 'SparX', 'Bata', 'Reebok', 'Nike'],
    datasets: [{
        label: '% of Reviews',
        data: [65, 72, 91, 54, 44, 31],
        borderWidth: 1,
        hoverBorderColor: '#000',
        backgroundColor: []
    }]
};


const config = {
    type: 'bar',
    data,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};


const myChart = new Chart(document.getElementById('myChart'), config);