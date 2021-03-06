/*
    Author: Jessmer John Palanca
    Section: CSC337 Web Programming SPRING2019, Homework 4
    Filename: speedreader.js
    Description: The javascript file for the speedreader.html
*/

'use strict';

(function(){
    /** -initializing the global variables
      * -nputText is the text input to be read
      * -timer calls th4 readText function to read and display text in the
      *  "upperBox" at a given frame speed
      * - word is the individual string in the input text
    */
    let inputText = null;
    let timer = null;
    let word = 0;

    // when the page is fully loaded, do this function
    window.onload = function(){
        // initially disable the stop button
        document.getElementById("stop").disabled = true;
        // onclick variable for the start button
        let startButton = document.getElementById("start");
        startButton.onclick = start;
        //  onclick variable for the stop button
        let stopButton = document.getElementById("stop");
        stopButton.onclick = stop;
        // when the frame speed is changed, go to changeSpeed function
        let speedOption = document.getElementById("speed");
        speedOption.onchange = changeSpeed;
        // when the text font is changed, go to changeSize function
        document.getElementById("medium").onclick = changeSize;
        document.getElementById("big").onclick = changeSize;
        document.getElementById("bigger").onclick = changeSize;
    };

    /** When the start button is pressed, this function takes the input text,
      * and store it as an array of strings in the global variabLe "inputText".
      * In addition, right after the start button is pressed, this button will
      * immediatelty be disable. The text input area is also disabled so the
      * user can't edit or add contents in the input text. On the other hand,
      * the stop button is enabled to allow the user to stop displaying the
      * text in the 'div'. This function triggers the readText function to start
      * displaying text in the 'div'.
    */
    function start(){
        let tempText = "";

        document.getElementById("start").disabled = true;
        document.getElementById("textCOntent").disabled = true;
        document.getElementById("stop").disabled = false;

        tempText = document.getElementById("textCOntent").value;
        inputText = tempText.split(/[ \t\n]+/);

        timer = setInterval(readText, changeSpeed());

    }

    /** When this function is called, it displays the current word generated by
      * the removePunctation function to the 'div' box area. If "!display", it
      * will display an empty string to the 'div' box area (this actually happens
      * when the 'stop' function is called).
    */
    function displayText(display){
        let text = removePunctation();
        let upperBox = document.getElementById("upperBox");

        if (display){
            upperBox.innerHTML = text;
        }
        else{
            upperBox.innerHTML = "";
        }
    }

    /** This function is called in the 'start' function, and will be called until
      * reaches the final word of the text input. If it reaches the end of the
      * text, this function calls the 'stop' function to diplay an empty string
      * in the 'div' box. This function increments the 'word' everytime it's
      * being called.
    */
    function readText(){

        displayText(true);
        word++;

        if (word == inputText.length){
            stop();
        }

    }

    /** When the user selects one of the size buttons from the controller, this
      * function immediatelty changes the contents of the upperBox's font size
      * the desired size. This function will change the classname of the div from
      * 'initialSize' to the desired id name of the size button (ie. bigger).
      * This will trigger one of the css functions, which is in our case '.bigger'.
      * Once it's triggered, the css style will be immediatelty applied to the
      * apperance of the text.
    */
    function changeSize(){
        let textSize = document.getElementById("upperBox");
        textSize.className = this.id;
    }

    /** This function removes any possible punctuation marks that is attached
      * to the very end of the string. If the string ends with multiple
      * punctuation marks, only the last single punctuation mark will be
      * removed. If the string ends with a punctuation mark, it will be displayed
      * for twice the normal amount of time. This is done by using the splice()
      * function. This function makes a duplicate of the string that ends with
      * a punctuation mark, and then insert it to that same index position of
      * string, making it appeared twice in the array of string. This will
      * cause a delay effect to the displayed text, which is what we want.
    */
    function removePunctation(){
        let punctuationMarks = ['.', ',', '!', '?', ';', ':'];
        let i = 0;
        let lastChar = (inputText[word].length) - 1;

        while (i < punctuationMarks.length){
            if(inputText[word][lastChar] === punctuationMarks[i]){
                inputText[word] = inputText[word].substring(0, lastChar);
                inputText.splice(word, 0, inputText[word]);
            }
            i++;
        }
        return inputText[word];
    }

    /** This function changes the speed of the text being displayed in the 'div'.
      * When this function is called, it will use the clearInterval function
      * first, which clears the current time interval, before transitioning to
      * the desired speed.
    */
    function changeSpeed(){
        let speed = document.getElementById("speed").value;
        if(timer){
            clearInterval(timer);
            timer = setInterval(readText, speed);
        }
        return speed;
    }

    /** This function stops the animation in the 'div', which causes to display
      * an empty string. When this function is called, the 'start' button will be
      * enabled, as well as the text input area. The 'stop' button will be
      * disabled immediatelty. The timer and word will also be reset.
    */
    function stop(){
        document.getElementById("start").disabled = false;
        document.getElementById("textCOntent").disabled = false;
        document.getElementById("stop").disabled = true;
        clearInterval(timer);
        displayText(false);
        word = 0;
        timer = null;
    }


})();
