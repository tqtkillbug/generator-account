$("#selectTypeAcc").on('change', () => {
    const vl = $("#selectTypeAcc").val();

})
$(document).on('click', '#gen-btn', function (e) {
    const vl = $("#selectTypeAcc").val();
    if (vl !== 'chatgpt') return;
    callApiGetAccount();
});


function callApiGetAccount() {
    loading(true)
    $.ajax({
        url: 'https://etaservice.ekysofts.xyz/api/v1/free/account/generator',
        // url: 'http://localhost:8088/api/v1/free/account/generator',
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: (data) => {
            if (data === '') return;
            $('#username').val(data.userName)
            $('#password').val(data.password)
            $('#idacc').val(data.id)


            loading(false)

        },
        done: () => {
            loading(false)
            showToast(2, "Get Chat GPT Account Success!")
        }
    });
}

$(document).on('click', '#copyUserName', function (e) {
    copy($('#username').val())
});

$(document).on('click', '#userNameError', function (e) {
    const id = $('#idacc').val();
    console.log(id)
    if (id == 0) return;
    $.ajax({
        url: 'https://etaservice.ekysofts.xyz/api/v1/free/account/delete/' + id,
        // url: 'http://localhost:8088/api/v1/free/account/delete/' + id,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: (data) => {
            console.log("data")
        },
        done: () => {
        }
    });
    callApiGetAccount();
});


$(document).on('click', '#copyUserNamePass', function (e) {
    copy($('#password').val())

});

function copy(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save main text in it
    sampleTextarea.select(); //select textarea contenrs
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
    showToast(1, "Copied Success!")
}


///////////////////////
function showToast(type, message) {
    switch (type) {
        case 1:
            iziToast.show({
                theme: 'dark',
                position: "bottomLeft",
                displayMode: 'replace',
                message: message,
                progressBarColor: 'rgb(0, 255, 184)',
            });
            break;
        case 2:
            iziToast.success({
                displayMode: 'replace',
                position: "bottomLeft",
                message: message,
            });
            break;
        case 3:
            iziToast.error({
                displayMode: 'replace',
                position: "bottomLeft",
                message: message,
            });
            break;
        case 4:
            iziToast.warning({
                displayMode: 'replace',
                position: "bottomLeft",
                message: message,
            });
            break;
    }
}

function loading(isLoad) {
    if (isLoad) {
        $("#gen-btn").addClass("loading")
    } else {
        $("#gen-btn").removeClass("loading")

    }
}

