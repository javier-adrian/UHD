var formatBlock = function () {
    return {
        message: `
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 md:w-6 md:h-6 my-4 me-3 text-gray-200 animate-spin dark:text-gray-600 fill-red-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="align-middle md:text-xl text-stone-900">Loading</span>`,
        css: {
            border: "0px solid #1c1917",
            borderRadius: "5px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)"
        },
        overlayCSS: {
            opacity: "0.1",
            width: "200vw",
            height: "200vh",
            cursor: "default"
        }
    };
}

var checkSession = function () {
    $.get("../scripts/php/checkSession.php", function(data) {
        var sessiondata = $.parseJSON(data);

        if(sessiondata.isSuccess) {
            console.log("active session")
            $(location).attr("href", "../dashboard/index.html");
        } else {
            console.log("inactive session")
            // loadFirst();
        }
    });
}

$.validate({
    form: "#frmLogin",
    modules: "security"
});

$("#frmRegister").submit(function(e) {
    e.preventDefault();
    $("#signup").block(formatBlock());

    var registerObj = $("#frmRegister").serializeArray();

    $.post("../scripts/php/register.php", registerObj, function(data) {
        console.log(data.msg)
        if (!data.isSuccess) {
            var msg = data.msg;
            var alert = `
            <div class="text-sm align-middle md:text-base bg-red-100 border border-red-400 text-red-700 mb-4 px-4 py-3 pt-3.5 md:pt-3 rounded relative" role="alert">
                ${msg}
                <span class="absolute top-0 bottom-4 right-0 px-4 py-3">
                    <svg id="dismiss" class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </button>
                </span>
            </div>`;

            $("#admin-msg").html(alert);

            $("#dismiss").on("click", function () {
                $("#admin-msg").html("")
            });
        } else {
            var msg = data.msg;
            checkSession();
        }

    }, "json");

    $("#signup").unblock();
});
