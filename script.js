let container = document.querySelector('.container')
let result = document.querySelector('.result')

result.value = '0'
selectOperator = null
firstValue = null

//containerdeki elemanlara tıklama olayını targetle seçtik
container.addEventListener('click', function (e) {
    let element = e.target

    //container içindeki buton elemanları haricindeki elemanlara tıklanıldığında geri döndürdük
    if (!element.matches('button')) return

    //off clasını içeren elemana tıklandığında value boş olarak atadık
    if (element.classList.contains('off')) {
        result.value = ''
        return
    }

    //operator clasını içeren elemana tıklandığında 
    if (element.classList.contains('operator')) {
        selectOperator = element.value // null değeri aşağıda kontrol edildi
        selectOperator1 = element.value // operatore atanan değerle işlem yapıldı
        return
    }

    //clear clasını içeren elemana tıklandığında value 0 atadık
    if (element.classList.contains('clear')) {
        result.value = '0'
        return
    }


    //decimal clasını içeren elemana tıklandığında . ekledik.  . önceden result value de yoksa inputtaki elemanı silmeden sonuna . ekle dedik
    if (element.classList.contains('decimal')) {
        if (!result.value.includes('.'))
            result.value = result.value + element.value
        return
    }

    //del class ı olan elemanı içeriyorsa ve result.value 0 değilse result.value değerinin sonundan 1 eleman siliyoruz
    if(element.classList.contains('del')) {
        if(!result.value == '0') {
            result.value = result.value.slice(0,-1) 
        }
    }


    if (element.classList.contains('equal')) {
        if (selectOperator1 === '+') {
            result.value = Number(firstValue) + Number(result.value)
        } else if (selectOperator1 === '-') {
            result.value = Number(firstValue) - Number(result.value)
        } else if (selectOperator1 === '/') {
            result.value = Number(firstValue) / Number(result.value)
        } else if (selectOperator1 === '*') {
            result.value = Number(firstValue) * Number(result.value)
        } else if (selectOperator1 === '%') {
            result.value = Number(result.value)/100
        } 

    }


    if (element.classList.contains('num')) {
        if (selectOperator == null) {       // selectoperator null değeri içeriyorsa
            if (result.value === '0') {      // inputun valuesi 0 ise 
                result.value = element.value // input value değerine direkt tıklanan num class içindeki değeri getir
            } else {
                result.value = result.value + element.value // input valuesi 0 değilse input value ile element value yu string olarak yan yana yazdıryoruz 12+23 = 1223 şeklinde
            }
        } else {        // selectoperator null değilse yani içinde değer varsa
            firstValue = result.value //first value değerine input value yi atıp  first valuede ilk değeri saklıyoruz
            result.value = element.value // input value değerine yeni tıklanan element value değerini atıyoruz
            selectOperator = null   // selectoroperator u tekrar null a çekiyoruz çünkü yeniden değer girildiğpinde (result.value = result.value + element.value) ifadesinin tekrar çalışması lazım. yoksa örn 3 tıklandı sonra 4 e tıklandığında 3 siliniyor. 34 olablmesi için tekrar null yaptık
        }
    }

})

