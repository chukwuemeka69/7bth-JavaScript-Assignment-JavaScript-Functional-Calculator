function convert(s){
    ans = 0; p = 1;
    for(var i=s.length-1;i>=1;i--){
        ans+=p*s[i], p*=10;
    }
    if(s[0]=='-') ans*=-1;
    else if(s[0]!='+') ans+=p*s[0];
    return ans;
}

function isNum(s){ return s>='0' && s<='9' && s; }

function operate(s, opt, t){
    if(opt=='+') return s+t;
    if(opt=='-') return s-t;
    if(opt=='*') return s*t;
    if(t!=0) return s/t;
    return "error";
}

function getAns(s){
    num = "";
    const op = []; sz = 0; ok=0;
    for(var i=0;i<s.length;i++){
        if(isNum(s[i])) num+=s[i];
        else if((i && i<s.length-1 && !isNum(s[i-1]) && isNum(s[i+1]) && (s[i]=='+' || s[i]=='-') && !ok)) num+=s[i],ok=1;
        else{
            if(num=="") return "error";
            if(i && !isNum(s[i-1])) return "error";
            op[sz++]=convert(num); op[sz++]=s[i];
            num = ""; ok=0;
        }
    }
    if(num!="") op[sz++]=convert(num);
    else if(!isNum(op[sz-1])) return "error";
    if(op[0]==='*' || op[0]==='/') return "error";
    ans = 0; res = op[0];
    for(var i=0; i<sz-2; i+=2){
        res = operate(res,op[i+1],op[i+2]);
        if(res=="error") return res;
    }
    return res;
}

var keyPressed = document.querySelectorAll(".calc-button").length;
for (var i = 0; i < keyPressed; i++) {
    document.querySelectorAll(".calc-button")[i].addEventListener("click", function() {
        let calc = this.innerHTML;
        // document.getElementById("display").innerHTML=calc;
        let str = document.getElementById("display").innerHTML;
        var lastLetter = (str.length==0?'@':str.charAt(str.length - 1));
        if(lastLetter==" ") document.getElementById("display").innerHTML = "";
        if(calc==='C'){ document.getElementById("display").innerHTML = ""; }
        else{
            if(!isNum(calc)){
                if(document.getElementById("display").innerHTML.length){
                    if(calc==='='){
                        var displayed = document.getElementById("display").innerHTML;
                        document.getElementById("display").innerHTML = getAns(displayed)+" ";
                    }
                    else{
                        document.getElementById("display").innerHTML += calc;
                    }
                }
            }
            else document.getElementById("display").innerHTML += calc;
        }
    });
};


// function add (a,b) {
// 	return a+b;
// }
// function multiple  (a,b) {
// 	return a*b;
// }
// function  divide (a,b) {
// 	return a/b;
// }
// function subtract (a,b) {
// 	return a - b;
// function calculator (a,b, operator) {
// 	return operator (a,b);
// };
// var calcInnerHTML = this.innerHTML;
        // switch (calcInnerHTML) {
        //     case "C": 

        //         break;
        
        //     default:
        //         break;


// case "C": 
            //     document.getElementById("display").innerHTML = calc;
            //     break;
            // case "=": 
            //     document.getElementById("display").innerHTML = calc;
            //     break;

            // buttons.map( button => {
            //     button.addEventListener('click', (e) => {
            //         switch(e.target.innerText){
            //             case 'C':
            //                 display.innerText = '';
            //                 break;
            //             case '=':
            //                 try{
            //                     display.innerText = eval(display.innerText);
            //                 } catch {
            //                     display.innerText = "Error"
            //                 }
            //                 break;
            //             case '←':
            //                 if (display.innerText){
            //                    display.innerText = display.innerText.slice(0, -1);
            //                 }
            //                 break;
            //             default:
            //                 display.innerText += e.target.innerText;
            //         }
            //     });
            // });