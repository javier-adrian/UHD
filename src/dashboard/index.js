var declareForm = function () {
    return {
        message:
            "<form id='frmDeclare' class='p-4' action='#' method='POST'>" +
                "<div class='flex gap-4 justify-center'>" +
                    "<div class='flex flex-wrap justify-end mt-5'>" +
                        "<label for='temp' class='mt-2 font-semibold content-center'>Temperature</label>" +
                        "<label for='diagnosed' class='mt-6 font-semibold content-center'>Diagnosed</label>" +
                        "<label for='vaccinated' class='mt-4 font-semibold content-center'>Vaccinated</label>" +
                    "</div>" +
                    "<div class='flex flex-wrap justify-start mt-5 '>" +
                        "<input name='temp' id='temp' type='number' class='rounded-md w-32'>" +
                        "<div class='basis-full flex justify-start'><input name='diagnosed' id='diagnosed' type='checkbox' class='rounded-sm mt-4 h-6 w-6'></div>" +
                        "<input name='vaccinated' id='vaccinated' type='checkbox' class='rounded-sm mt-4 h-6 w-6'>" +
                    "</div>" +
                "</div>" +
                "<div class='flex justify-end gap-4 mt-10'>" +
                    "<button type='button' onclick='hideDeclareForm()' class='py-2 px-4 rounded-md font-semibold text-sm bg-white text-black ring-1 ring-inset ring-gray-300 shadow-sm'>Cancel</button>" +
                    "<button type='submit' class='py-2 px-4 rounded-md font-semibold text-sm bg-rose-950 text-white'>Declare</button>" +
                "</div>" +
            "</form>",
        css: {
            border: '2px solid #4c0519',
            width: '300px',
            borderRadius: "0.375rem",
        }
    }
}

var spinner = function () {
    return {
        message: '<svg aria-hidden=\"true\" role=\"status\" class=\"inline w-8 h-8 md:w-6 md:h-6 my-4 me-3 text-gray-200 animate-spin dark:text-gray-600\" viewBox=\"0 0 100 101\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">' +
            '<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>' +
            '<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#4c0519"/>' +
            '</svg>',
        css: {
            border: '0px',
            borderRadius: "5px",
            backgroundColor: "rgba(0,0,0,0)"
        }
    };
}


var showDeclareForm = function () {
    $('#full').block(declareForm());

    $('#frmDeclare').submit(function (e) {
        $('#frmDeclare').block(spinner());
        e.preventDefault()

        var declareObj = $('#frmDeclare').serializeArray()
        console.log(declareObj)

        $('#frmDeclare').unblock();
        hideDeclareForm()
    })
}


var hideDeclareForm = function () {
    $('#full').unblock();
}

var logout = function () {
    $.get('../scripts/php/logout.php', function (data) {
        var sessiondata = $.parseJSON(data);
        console.log(sessiondata)
        if(sessiondata.isSuccess) {
            $(location).attr('href','../index.html');
        } else {
            console.log("wtf")
        }
    });
}