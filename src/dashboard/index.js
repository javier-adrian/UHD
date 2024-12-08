var checkSession = function() {
    $.get("../scripts/php/checkSession.php", function(data) {
        console.log(!$.parseJSON(data).isSuccess)
        if (!$.parseJSON(data).isSuccess) {
            $(location).attr("href", "../index.html");
        }
    });
};

var formatDate = function (datetime) {
    var dateObject = new Date(datetime * 1000);

    var year = dateObject.getFullYear();
    var month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    var day = String(dateObject.getDate()).padStart(2, '0');
    var hours = String(dateObject.getHours()).padStart(2, '0');
    var minutes = String(dateObject.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

var declareForm = function (type = "", amount, description, datetime) {
    svgCode = (type) ? "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" : "M12 4.5v15m7.5-7.5h-15"

    return {
        message:
            `<form id="frmDeclare" class="p-4" action="#" method="POST">
                <div class="flex justify-start">
                    <button type="button" class="hideButton rounded-full bg-white relative flex max-w-xs items-center text-sm text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div class="inline-flex rounded-md shadow-sm" role="group">
                    <input type="radio" id="income" name="type" value="income" class="hidden peer/income" ${(type === "income") ? "checked" : ""}/>
                    <label for="income" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-l border-t border-b border-gray-200 rounded-s-lg peer-checked/income:bg-blue-500 peer-checked/income:text-white hover:bg-blue-100">
                        Income
                    </label>
                    <input type="radio" id="expense" name="type" value="expense" class="hidden peer/expense" ${(type === "expense") ? "checked" : ""}/>
                    <label for="expense" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-r border-t border-b border-gray-200 rounded-e-lg peer-checked/expense:bg-red-500 peer-checked/expense:text-white hover:bg-red-100">
                        Expense
                    </label>
                </div>
                
                <p id="income-error" class="font-normal text-xs italic text-red-500 pt-2"></p>

                <div class="flex flex-wrap justify-start mt-4">
                    <label for="datetime" class="w-full mt-4 ml-2 text-left text-gray-900 font-medium">Date and Time <span id="datetime-error" class="font-normal text-xs italic text-red-500"></span></label>
                    <input value="${(datetime) ? formatDate(datetime) : ""}" id="datetime" name="datetime" type="datetime-local" class="w-full pb-2 px-2 mx-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-red-500" placeholder="MM/YY/DDDD">
                    <label for="amount" class="w-full mt-4 ml-2 text-left text-gray-900 font-medium">Amount <span id="amount-error" class="font-normal text-xs italic text-red-500"></span></label>
                    <div class="flex flex-nowrap">
                        <input value="${(amount) ? (amount / 100).toString() : ""}" type="number" pattern="^\\d+(\\.|\\,)\\d{2}$" id="amount" name="amount" class="w-full pb-2 px-2 mx-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-red-500">
                        <label for="currency" class="sr-only">Currency</label>
                        <select id="currency" name="currency" class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-0 sm:text-sm">
                          <option id="PHP" value="PHP">PHP</option>
                          <option id="USD" value="USD">USD</option>
                          <option id="CAD" value="CAD">CAD</option>
                          <option id="EUR" value="EUR">EUR</option>
                          <option id="AED" value="AED">AED</option>
                          <option id="CNY" value="CNY">CNY</option>
                          <option id="KRW" value="KRW">KRW</option>
                          <option id="ILS" value="ILS">ILS</option>
                          <option id="AUD" value="AUD">AUD</option>
                          <option id="INR" value="INR">INR</option>
                          <option id="NZD" value="NZD">NZD</option>
                          <option id="MYR" value="MYR">MYR</option>
                          <option id="SGD" value="SGD">SGD</option>
                          <option id="CHF" value="CHF">CHF</option>
                          <option id="THB" value="THB">THB</option>
                          <option id="TRY" value="TRY">TRY</option>
                        </select>
                    </div>
                    <label for="description" class="w-full mt-4 ml-2 text-left text-gray-900 font-medium">Description <span id="description-error" class="font-normal text-xs italic text-red-500"></span></label>
                    <input value="${(description) ? description : ""}" type="text" id="description" name="description" class="w-full pb-2 px-2 mx-2 border-0 border-b border-gray-400 focus:outline-none focus:ring-0 focus:border-red-500">
                </div>

                <div class="flex justify-end gap-4 mt-8 mb-3 mr-3">
                    <button type="submit" class="py-2 px-2 rounded-full font-semibold text-sm bg-white text-${(type) ? "black" : "red"}-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="${svgCode}" />
                        </svg>
                    </button>
                </div>

            </form>`,
        css: {
            border: "0px solid #1c1917",
            width: "300px",
            borderRadius: "0.375rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            cursor: "default",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        overlayCSS: {
            opacity: "0.1",
            width: "200vw",
            height: "200vh",
            cursor: "default"
        },
        onBlock: function () {
            $("body").addClass("no-scroll")
        },
        onUnblock: function () {
            $("body").removeClass("no-scroll")
        }
    }
}

var spinner = function () {
    return {
        message:
            `<div class="py bg-white rounded-md">
                <svg aria-hidden="true" role="status" class="inline w-8 h-8 md:w-6 md:h-6 my-4 me-3 text-gray-200 fill-red-500 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>`,
        css: {
            border: "0px",
            borderRadius: "5px",
            backgroundColor: "rgba(0,0,0,0)"
        },
        overlayCSS: {
            opacity: "0.1",
        }
    };
}

var item = function(value) {
    var {id, amount, description, type, timestamp, currency, datetime} = value

    var color = "black"
    if (type === "expense")
        color = "red"
    if (type === "income")
        color = "blue"

    return `
    <li id="${id}" class="group flex justify-between gap-x-6 py-5 relative">
        <div class="flex min-w-0 gap-x-6">
            <div class="min-w-0 flex-auto sm:pt-2 w-16 sm:w-32">
                <p class="text-xl font-semibold text-${color}-500 text-right"> <span class="text-black text-xs">${currency}</span> ${(amount/100).toFixed(2)}</p>
            </div>
            <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">${description} <span class="ml-2 truncate font-medium text-xs/5 text-gray-500 inline md:hidden">${timestamp.toString().slice(0,-3)}</span></p>
            </div>
        </div>

        <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <p class="mt-1 truncate text-xs/5 text-gray-500">${timestamp.toString().slice(0,-3)}</p>
        </div>

        <div class="ml-4 flex flex-wrap gap-4 sm:gap-8 justify-end md:ml-6 md:mr-6 relative">
            <button class="itemUpdate basis-full sm:basis-0 rounded-full bg-white relative flex max-w-xs items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="size-4 sm:size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
                </svg>
            </button>
            <button class="itemDelete basis-full sm:basis-0 rounded-full bg-white relative flex max-w-xs items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg class="size-4 sm:size-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                </svg>
            </button>
        </div>
    </li>
    `
}

var add = function () {
    $("#frmDeclare").block(spinner());

    var date = new Date($("#datetime").val())

    var declareObj = $("#frmDeclare").serializeArray()
    declareObj[2].value *= 100
    declareObj.push({
        name: "datetime",
        value: date.valueOf() / 1000
    })

    declareObj.push({
        name: "action",
        value: "isCreate"
    })

    console.log(declareObj)

    $.post("../scripts/php/statement.php", declareObj, function (data) {
        console.log(data.msg)
        getStatements()
    }, "json")

    $('#frmDeclare').unblock();
    hideDeclareForm()
}

var showDeclareForm = function () {
    $("body").addClass("no-scroll")
    $.blockUI(declareForm());
    $("#currency").val("USD");

    $("#frmDeclare .hideButton").on("click", function () {
        hideDeclareForm()
    })

    $(".hideButton").on("keydown", function (e) {
        if (e.keyCode ===  27) {
            $(this).click()
        }
    });

    $("#frmDeclare").validate({
        modules: "security",
        ignore: ".ignore",
        rules: {
            type: "required",
            amount: {
                required: true,
                number: true
            },
            datetime: "required",
            description: "required",
        },
        submitHandler: function () {
            add()
        },
        errorPlacement: function (error, element) {
            console.log(element)
            $(`#${element.attr("id")}-error`).html(`${error.html()}`);
        }
    });

    $("#frmDeclare input").on("input", function () {
        var element = $(this);
        if (element.valid()) {
            $(`#${element.attr("id")}-error`).html("");
        }
    });
}

var hideDeclareForm = function () {
    $.unblockUI();
    $("body").removeClass("no-scroll")
}

var logout = function () {
    Cookies.remove('username')
    Cookies.remove('password')
    $.get("../scripts/php/unsetSession.php", function (data) {
        var sessiondata = $.parseJSON(data);

        console.log(sessiondata)

        if(sessiondata.isSuccess) {
            $(location).attr("href", "../index.html");
        } else {
            console.log("wtf")
        }
    });
}

var deleteStatement = function (statement) {
    $.post(
        "../scripts/php/statement.php",
            {"action": "isDelete",
            "id": statement},
        function (data) {
            console.log(data)
    }, "json")

    getStatements()
}

var update = function (id) {
    $("#frmDeclare").block(spinner());

    var date = new Date($("#datetime").val());

    var declareObj = $('#frmDeclare').serializeArray()

    declareObj.push({
        name: "datetime",
        value: date.valueOf() / 1000
    })

    declareObj[2].value *= 100

    declareObj.push({
        name: "id",
        value: id
    })

    declareObj.push({
        name: "action",
        value: "isUpdate"
    })

    console.log(declareObj)

    $.post("../scripts/php/statement.php", declareObj, function (data) {
        console.log(data.msg)
    }, "json")

    getStatements()
    $("#frmDeclare").unblock();
    hideDeclareForm()
}

var updateStatement = function (value) {
    var {id, amount, description, type, currency, datetime} = value

    $("body").css("no-scroll")

    $.blockUI(declareForm(type, amount, description, new Date(datetime).valueOf() / 1000));

    $("#frmDeclare .hideButton").on("click", function () {
        hideDeclareForm()
    })

    $("#frmDeclare").validate({
        modules: "security",
        ignore: ".ignore",
        rules: {
            type: "required",
            amount: {
                required: true,
                number: true
            },
            datetime: "required",
            description: "required",
        },
        submitHandler: function () {
            update(id)
        },
        errorPlacement: function (error, element) {
            console.log(element)
            $(`#${element.attr("id")}-error`).html(`${error.html()}`);
        }
    });

    $("#frmDeclare input").on("input", function () {
        var element = $(this);
        if (element.valid()) {
            $(`#${element.attr("id")}-error`).html("");
        }
    });

    $("#currency").val(currency);
}

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var getStatements = function () {
    let readObj = {
        "action": "isRead",
        "search": $("#search").val(),
        "type": $("input[name=type-filter]:checked").val()
    }

    $.get("../scripts/php/statement.php", readObj, function (data) {

        $("#statements").html("")

        var now = new Date()

        for ([year, value] of Object.entries(data).reverse()) {
            $("#statements").append(`<div id="${year}"></div>`)

            if (now.getFullYear() != year) {
                $(`#${year}`).append(`
                    <div class="relative flex py-5 items-center">
                        <div class="flex-grow border-t border-gray-200"></div>
                            <h2 class="flex-shrink mx-4 px-3 py-8 text-center text-8xl font-semibold text-stone-900">${year}</h2>
                        <div class="flex-grow border-t border-gray-200"></div>
                    </div>
                `)
            }

            for ([month, value] of Object.entries(data[year]).reverse()) {
                $(`#${year}`).append(`<div id="${year}${month}"></div>`)

                if (now.getMonth() + 1 != month || now.getFullYear() != year) {
                    $(`#${year}${month}`).append(`<h2 class="px-3 py-2 text-4xl font-semibold text-stone-900">${months[month - 1]}</h2>`)
                }

                for ([day, value] of Object.entries(data[year][month]).reverse()) {
                    $(`#${year}${month}`).append(`<div id="${year}${month}${day}" class="divide-y divide-gray-100"></div>`)

                    if (now.getDay() != month || now.getMonth() + 1 != month || now.getFullYear() != year) {
                        $(`#${year}${month}${day}`).append(`<h2 class="px-3 py-2 text-lg font-semibold text-stone-900">${day}</h2>`)
                    }

                    for (let [id, value] of Object.entries(data[year][month][day]).reverse()) { // let to restart the value for some reason???
                        // console.log(value)

                        $(`#${year}${month}${day}`).append(item(value))

                        $(`#${year}${month}${day}`).on("click", `#${id} .itemDelete`, function () {
                            deleteStatement(id)
                        })

                        $(`#${year}${month}${day}`).on("click", `#${id} .itemUpdate`, function () {
                            updateStatement(value)
                        })

                        // console.log($(`#${id} .itemUpdate`))
                    }
                }
            }
        }
    }, "json")
}

$("input[name=type-filter]").on("change", function (e) {
    $("input[name=type-filter]").not(this).prop('checked', false)

    getStatements()
});

$("#search").on("keydown", function (e) {
    if (e.keyCode === 27) {
        $("#search").blur()
    }
    getStatements()
});

$(document).on("keydown", function (e) {
    if (e.ctrlKey && e.keyCode === 75) {
        $("#search").focus()
    }

    if (e.ctrlKey && e.keyCode === 67) {
        $("#add").click()
    }
});

checkSession()
getStatements()
