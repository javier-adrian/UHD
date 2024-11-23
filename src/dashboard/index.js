var declareForm = function () {
    return {
        message:
            "<form id='frmDeclare' class='p-4' action='#' method='POST'>" +
                '<div class="flex justify-start">' +
                    '<button onclick="hideDeclareForm()" class="rounded-full bg-white relative flex max-w-xs items-center text-sm text-gray-400">' +
                        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />' +
                        '</svg>' +
                    '</button>' +
                '</div>' +

                '<div class="inline-flex rounded-md shadow-sm" role="group">' +
                    '<input type="radio" id="income" name="type" value="income" class="hidden peer/income"/>' +
                    '<label for="income" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-l border-t border-b border-gray-200 rounded-s-lg peer-checked/income:bg-blue-500 peer-checked/income:text-white hover:bg-blue-100">' +
                        'Income' +
                    '</label>' +
                    '<input type="radio" id="expense" name="type" value="expense" class="hidden peer/expense"/>' +
                    '<label for="expense" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-r border-t border-b border-gray-200 rounded-e-lg peer-checked/expense:bg-red-500 peer-checked/expense:text-white hover:bg-red-100">' +
                        'Expense' +
                    '</label>' +
                '</div>' +

                '<div class="flex flex-wrap justify-start mt-4">' +
                    '<label for="amount" class="w-full mt-4 ml-2 text-left text-gray-900 font-medium">Amount</label>' +
                    '<input type="number" pattern="^\\d+(\\.|\\,)\\d{2}$" id="amount" name="amount" class="w-full pb-2 px-2 mx-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-red-500">' +
                    '<label for="description" class="w-full mt-4 ml-2 text-left text-gray-900 font-medium">Description</label>' +
                    '<input type="text" id="description" name="description" class="w-full pb-2 px-2 mx-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-red-500">' +
                '</div>' +

                "<div class='flex justify-end gap-4 mt-8 mb-3 mr-3'>" +
                    "<button type='submit' class='py-2 px-2 rounded-full font-semibold text-sm bg-white text-red-500'>" +
                        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">' +
                            '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />' +
                        '</svg>' +
                    "</button>" +
                "</div>" +

            "</form>",
        css: {
            border: '0px solid #1c1917',
            width: '300px',
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            cursor: "default"
        },
        overlayCSS: {
            opacity: "0.1",
        }
    }
}

var spinner = function () {
    return {
        message:
            '<div class="py bg-white rounded-md">' +
            '<svg aria-hidden=\"true\" role=\"status\" class=\"inline w-8 h-8 md:w-6 md:h-6 my-4 me-3 text-gray-200 fill-red-500 animate-spin dark:text-gray-600\" viewBox=\"0 0 100 101\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">' +
            '<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>' +
            '<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>' +
            '</svg>' +
            '</div>',
        css: {
            border: '0px',
            borderRadius: "5px",
            backgroundColor: "rgba(0,0,0,0)"
        },
        overlayCSS: {
            opacity: "0.1",
        }
    };
}

var item = function(id, amount, description, type, timestamp) {
    var date = new Date(timestamp*1000)
    var yy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    var HH  = date.getHours().toString();
    var MM  = date.getMinutes().toString();
    var SS  = date.getSeconds().toString();

    if (MM.length == 1)
        MM = "0" + MM

    var dateString = (mm[1]?mm:"0"+mm[0]) + "/" + (dd[1]?dd:"0"+dd[0]) + "/" + yy + " " + HH + ":" + MM
    var color = "black"

    if (type === "expense")
        color = "red"
    if (type === "income")
        color = "blue"

    return `
    <li class="flex justify-between gap-x-6 py-5" data-id="` + id.toString() + `">
        <div class="flex min-w-0 gap-x-6">
            <div class="min-w-0 flex-auto pt-2 w-32">
                <p class="text-xl font-semibold text-` + color + `-500 text-right">` + (amount/100).toFixed(2) + `</p>
            </div>
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">` + description + `</p>
                <p class="mt-1 truncate text-xs/5 text-gray-500">` + dateString + `</p>
            </div>
        </div>
        <div class="ml-4 mr-4 flex gap-8 justify-end md:ml-6 md:mr-6 relative">
            <button onclick="" class="rounded-full bg-white relative flex max-w-xs items-center text-sm">
                <svg class="size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                </svg>
            </button>
            <button onclick="" class="rounded-full bg-white relative flex max-w-xs items-center text-sm">
                <svg class="size-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
            </button>
        </div>
    </li>
    `
}


var showDeclareForm = function () {
    $('#full').block(declareForm());

    // $("#frmDeclare").validate({
    //     rules: {
    //         type: "required",
    //         amount: "required",
    //     },
    // });


    $('#frmDeclare').submit(function (e) {
        // if (!($('#frmDeclare').valid())){
        //     console.log("lkjsdkfj")
        // }
        $('#frmDeclare').block(spinner());
        e.preventDefault()

        var date = new Date()

        var declareObj = $('#frmDeclare').serializeArray()
        declareObj[1].value *= 100
        declareObj.push({
            name: 'timestamp',
            value: date.valueOf() / 1000
        })

        declareObj.push({
            name: 'action',
            value: 'isCreate'
        })

        console.log(declareObj)

        $.post('../scripts/php/statement.php', declareObj, function (data) {
            console.log(data.msg)
        }, 'json')

        $('#frmDeclare').unblock();
        hideDeclareForm()
        getStatements()
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

var getStatements = function () {
    $.get('../scripts/php/statement.php', {"action": "isRead"}, function (data) {
        $("#statements").html("")
        for ([key, value] of Object.entries(data))
        {
            $('#statements').append(item(value.id, value.amount, value.description, value.type, value.timestamp))
        }
        console.log(Object.entries(data))
    }, 'json')

}

getStatements()