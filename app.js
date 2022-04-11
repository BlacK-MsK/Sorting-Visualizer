// const numberOfBars = 10;
console.log("Generating Bars.....");

var arr_size=document.querySelector("#arr_sz"); 
var numberOfBars=arr_size.value;

var container = document.getElementById("arrayBarDiv");


function generate(numberOfBars) {
    //making an array of heights of array
    const generatedBars = {};
    //adjusting width of bars according to the number of bars
    const width = (500/numberOfBars) *2 + "px";
    //removing all previously generated bars to create new bars
    const myNode = document.getElementById("arrayBarDiv");
    myNode.innerHTML = '';
    //generating all N number of bars using for loop
    for (let index = 0; index < numberOfBars; index++) {
        const element = Math.floor(Math.random() * 101);
        const className = "generated-bar";
        generatedBars[index] = element;
        var bar = document.createElement("div");
        document.getElementById('arrayBarDiv').appendChild(bar);
        bar.setAttribute('class', className);
        const height = element*5+"px";
        
        document.getElementsByClassName(className)[index].style.width = width;
        document.getElementsByClassName(className)[index].style.height = height;

        var array_ele_label = document.createElement("label");
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = element;
        bar.appendChild(array_ele_label);

    }    
}
generate(numberOfBars);


function swap(bar1, bar2) {
    return new Promise((resolve) => {
            var value1 = Number(bar1.childNodes[0].innerHTML);
            var value2 = Number(bar2.childNodes[0].innerHTML);

            bar1.style.height = value2*5+"px";
            bar2.style.height = value1*5+"px";

            bar1.childNodes[0].innerText = value2;
            bar2.childNodes[0].innerText = value1;

            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    container.insertBefore(bar1, bar2);
                    resolve();
                }, 310-document.getElementById("sort_speed").value);
            });
    });
}


async function bubbleSort(delay = 310-document.getElementById("sort_speed").value) {
    var bar = document.querySelectorAll(".generated-bar");
    for(let i=0;i<bar.length;i++){
        for(let j=0;j<bar.length-i-1;j++){
            bar[j].style.backgroundColor = "yellow";
            bar[j+1].style.backgroundColor = "yellow";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 310-document.getElementById("sort_speed").value)
            );

            var value1 = Number(bar[j].childNodes[0].innerHTML);
            var value2 = Number(bar[j + 1]
                        .childNodes[0].innerHTML);

            if(value1>value2){
                await swap(bar[j], bar[j+1]);
                bar = document.querySelectorAll(".generated-bar");
            }
            bar[j].style.backgroundColor = "red";
            bar[j+1].style.backgroundColor = "red";


        }
        bar[bar.length - i -1].style.backgroundColor = "green";
    }
}


async function selectionSort(delay = 310-document.getElementById("sort_speed").value) {
    var bars = document.querySelectorAll(".generated-bar");
    var min_idx = 0;
   for (var i = 0; i < bars.length; i += 1) {

    min_idx = i;
    bars[i].style.backgroundColor = "purple";
    for (var j = i + 1; j < bars.length; j += 1) {
      bars[j].style.backgroundColor = "yellow";
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 310-document.getElementById("sort_speed").value)
      );
      var val1 = parseInt(bars[j].childNodes[0].innerHTML);
      var val2 = parseInt(bars[min_idx].childNodes[0].innerHTML);
        
      // Compare val1 & val2
      if (val1 < val2) {
        if (min_idx !== i) {
          bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
        }
        min_idx = j;
        } else {
        bars[j].style.backgroundColor = "  rgb(24, 190, 255)";
      }
    }

    var temp1 = bars[min_idx].style.height;
    var temp2 = bars[min_idx].childNodes[0].innerText;
    bars[min_idx].style.height = bars[i].style.height;
    bars[i].style.height = temp1;
    bars[min_idx].childNodes[0].innerText = bars[i].childNodes[0].innerText;
    bars[i].childNodes[0].innerText = temp2;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 310-document.getElementById("sort_speed").value)
    );

    window.requestAnimationFrame(function() {
                setTimeout(() => {
                    resolve();
                }, 310-document.getElementById("sort_speed").value);
            });
    bars[min_idx].style.backgroundColor = "  rgb(24, 190, 255)";
  
    bars[i].style.backgroundColor = "green";
  }

}


async function insertionSort(delay = 310-document.getElementById("sort_speed").value) {
  let bars = document.querySelectorAll(".generated-bar");
  
  bars[0].style.backgroundColor = " rgb(49, 226, 13)";
  for (var i = 1; i < bars.length; i += 1) {
  
    var j = i - 1;
  
    var key = parseInt(bars[i].childNodes[0].innerHTML);
  
    var height = bars[i].style.height;
  
    bars[i].style.backgroundColor = "darkblue";

    await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 310-document.getElementById("sort_speed").value)
  );
  
    while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
        
      bars[j].style.backgroundColor = "darkblue";
        
      bars[j + 1].style.height = bars[j].style.height;
      bars[j + 1].childNodes[0].innerText = 
      bars[j].childNodes[0].innerText;

      j = j - 1;

      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 310-document.getElementById("sort_speed").value)
      );

      for(var k=i;k>=0;k--){
        bars[k].style.backgroundColor = "green";
      }
    }
    bars[j + 1].style.height = height;
    bars[j + 1].childNodes[0].innerHTML = key;

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 310-document.getElementById("sort_speed").value)
    );

    bars[i].style.backgroundColor = "green";
  }
}



async function lometo_partition(l, r, delay = 310-document.getElementById("sort_speed").value) {
  var blocks = document.querySelectorAll(".generated-bar");
  
  // Storing the value of pivot element
  var pivot = 
  Number(blocks[r].childNodes[0].innerHTML);
  var i = l - 1;
  blocks[r].style.backgroundColor = "red";
  
  for (var j = l; j <= r - 1; j++) {
    // To change background-color of the
    // blocks to be compared
    blocks[j].style.backgroundColor = "yellow";
    // To wait for 700 milliseconds
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 310-document.getElementById("sort_speed").value)
    );
    var value = Number(blocks[j].childNodes[0].innerHTML);
  
    // To compare value of two blocks
    if (value < pivot) {
      i++;
      var temp1 = blocks[i].style.height;
      var temp2 = blocks[i].childNodes[0].innerText;
      blocks[i].style.height = blocks[j].style.height;
      blocks[j].style.height = temp1;
      blocks[i].childNodes[0].innerText =
      blocks[j].childNodes[0].innerText;
      blocks[j].childNodes[0].innerText = temp2;
      blocks[i].style.backgroundColor = "orange";
      if (i != j) blocks[j].style.backgroundColor = "pink";
      //To wait for 700 milliseconds
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve();
        }, 310-document.getElementById("sort_speed").value)
      );
    } else blocks[j].style.backgroundColor = "pink";
  }
  // Swapping the ith with pivot element
  i++;
  var temp1 = blocks[i].style.height;
  var temp2 = blocks[i].childNodes[0].innerText;
  blocks[i].style.height = blocks[r].style.height;
  blocks[r].style.height = temp1;
  blocks[i].childNodes[0].innerText =
  blocks[r].childNodes[0].innerText;
  blocks[r].childNodes[0].innerText = temp2;
  blocks[r].style.backgroundColor = "pink";
  blocks[i].style.backgroundColor = "green";
  
  // To wait for 2100 milliseconds
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, 310-document.getElementById("sort_speed").value)
  );
//   document.getElementsByClassName("block_id")[0].innerText = "";
//   for (var k = 0; k < document.getElementById("arr_sz").value; k++) 
//         blocks[k].style.backgroundColor = "#6b5b95";
//         return i;
}
  
// Asynchronous QuickSort function
async function quickSort(l, r, delay = 310-document.getElementById("sort_speed").value) {
  if (l < r) {
    // Storing the index of pivot element after partition
    var pivot_idx = await lometo_partition(l, r);
    // Recursively calling quicksort for left partition
    await quickSort(l, pivot_idx - 1);
    // Recursively calling quicksort for right partition
    await quickSort(pivot_idx + 1, r);
  }
}

















arr_size.addEventListener("input",event =>{
    generate(document.getElementById("arr_sz").value);
} );


let btn = document.getElementById("generate-new-array");
btn.addEventListener('click', event => {
  generate(document.getElementById("arr_sz").value);
});


let bubbleSortBtn = document.getElementById("bubble-sort");
bubbleSortBtn.addEventListener('click', event => {
  bubbleSort();
});

let selectionSortBtn = document.getElementById("selection-sort");
selectionSortBtn.addEventListener('click', event => {
  selectionSort();
});

let insertionSortBtn = document.getElementById("insertion-sort");
insertionSortBtn.addEventListener('click', event => {
  insertionSort();
});

let quickSortBtn = document.getElementById("quick-sort");
quickSortBtn.addEventListener('click', event => {
  quickSort(0, document.getElementById("arr_sz").value - 1);
});