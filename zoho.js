const quickHeplerViewElements = [
    {
        elementTag: "div",
        type: "parent",
        attributes: [
            {
                key: "id",
                value: "zoho-log-footer-reduce-version"
            },
            {
                key: "style",
                value: "width: 200px; position:fixed; top: 0px; z-index: 100; background-color: #2d3436; display: flex; padding: 10px; border-bottom-right-radius: 5px;"
            }
        ]
    },
    {
        elementTag: "button",
        type: "son",
        description: "Open helper",
        fn: displayZohoLogUI,
        attributes: [
            {
                key: "id",
                value: "zh-display-helper"
            },
            {
                key: "style",
                value: "height: 42px; width: 200px; border-radius: 7px; font-size: 17px; background-color: white; color: black; font-weight: bold"
            },
            {
                key: "onclick",
                value: "displayZohoLogUI();"
            }
        ]
    },
];

const fullHelperViewElements = [
    {
        elementTag: "div",
        type: "parent",
        attributes: [
            {
                key: "id",
                value: "zoho-log-footer"
            },
            {
                key: "style",
                value: "width: 50%; position:fixed; top: 0px; z-index: 100; background-color: #2d3436; display: flex; justify-content: flex-end; padding: 10px; border-bottom-right-radius: 5px; flex-wrap: wrap;"
            }
        ]
    },
    {
        elementTag: "input",
        type: "son",
        attributes: [
            {
                key: "id",
                value: "zh-time-picker"
            },
            {
                key: "style",
                value: "height: 40px;width: 150px; border-radius: 3px; font-size: 17px; padding-left: 10px"
            },
            {
                key: "type",
                value: "date"
            },
            {
                key: "value",
                value: getCurrentDate()
            },
        ]
    },
    {
        elementTag: "input",
        type: "son",
        attributes: [
            {
                key: "id",
                value: "zh-us-#-input"
            },
            {
                key: "style",
                value: "height: 40px;width: 150px; border-radius: 3px; font-size: 17px; padding-left: 10px; margin-left: 20px"
            },
            {
                key: "placeholder",
                value: "US #"
            },
        ]
    },
    {
        elementTag: "input",
        type: "son",
        attributes: [
            {
                key: "id",
                value: "zh-daily-log-input"
            },
            {
                key: "style",
                value: "height: 40px;width: 150px; border-radius: 3px; font-size: 17px; padding-left: 10px; margin-left: 20px"
            },
            {
                key: "placeholder",
                value: "Daily Log"
            },
        ]
    },
    {
        elementTag: "textarea",
        type: "son",
        attributes: [
            {
                key: "id",
                value: "zh-task-description"
            },
            {
                key: "style",
                value: "height: 40px; width: 200px; border-radius: 3px; font-size: 17px; padding-left: 10px; margin-left: 20px"
            },
            {
                key: "placeholder",
                value: "Notes"
            },
        ]
    }
];

const fullHelperViewFooter = [
    {
        elementTag: "div",
        type: "parent",
        attributes: [
             {
                key: "style",
                value: "display: flex; margin-top: 10px; width: 100%; justify-content: flex-end;"
            },
        ]
    },
    {
        elementTag: "button",
        type: "son",
        description: "Add",
        fn: completeZohoLog,
        attributes: [
            {
                key: "id",
                value: "zh-submit-task-btn"
            },
            {
                key: "style",
                value: "height: 42px; width: 100px; border-radius: 7px; font-size: 17px; margin-left: 18px; background-color: white; color: black; font-weight: bold; margin-right: 0px; border-right-width: 0px;"
            },
            {
                key: "onclick",
                value: "completeZohoLog();"
            }
        ]
    },
    {
        elementTag: "button",
        type: "son",
        description: "Close",
        fn: closeHelper,
        attributes: [
            {
                key: "id",
                value: "zh-close-helper"
            },
            {
                key: "style",
                value: "height: 42px; width: 100px; border-radius: 7px; font-size: 17px; margin-left: 15px; background-color: white; color: black; font-weight: bold; margin-right: 0px; border-right-width: 0px;"
            },
            {
                key: "onclick",
                value: "closeHelper();"
            }
        ]
    },
]

const getElementById = (id) => document.getElementById(id);
const getDOMBody = () => document.getElementsByTagName("body")[0];

function getCurrentDate() {
    const objectDate = new Date();
    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();
    const monthFormatted = month >= 10 ? month : `0${month}`;
    const dayFormatted = day >= 10 ? day : `0${day}`;
    return `${year}-${monthFormatted}-${dayFormatted}`;
}

function closeHelper() {
    const body = getDOMBody();
    getElementById("zoho-log-footer").remove();
    const parentElement = createElementsHandler(quickHeplerViewElements);
    body.appendChild(parentElement);
}

function createDOMElement(element) {
    const newElement = document.createElement(element.elementTag);
    element.attributes.forEach((x) => {
        newElement.setAttribute(x.key, x.value);
    })
    return newElement;
}

function elementCreatorHandler(elements, parentElement) {
    elements.filter(x => x.type !== "parent").forEach((element) => {
        const sonElement = createDOMElement(element);
        if (element.elementTag === "button") {
            sonElement.onclick = element.fn;
            sonElement.innerHTML = element.description;
        }
        parentElement.appendChild(sonElement);
    });
}

function createElementsHandler(elements, isFullHelper = false) {
    const parentElement = createDOMElement(elements.find(x => x.type === "parent"));
    elementCreatorHandler(elements, parentElement);

    if (isFullHelper) {
        const footerElement = createDOMElement(fullHelperViewFooter.find(x => x.type === "parent"));
        elementCreatorHandler(fullHelperViewFooter, footerElement);
        parentElement.appendChild(footerElement);
    }
    return parentElement;
}

function displayZohoLogUI() {
    const shortViewExist = getElementById("zoho-log-footer-reduce-version");
    if (!!shortViewExist)
        shortViewExist.remove();
    const body = getDOMBody();
    const parentElement = createElementsHandler(fullHelperViewElements, true);
    body.appendChild(parentElement);
}

function completeZohoLog() {
    // if opening from timesheet page:
    //document.querySelector(`[date-field="${day}/${month}/${year}"]`).firstChild.firstChild.firstChild.firstElementChild.click();
    getElementById("globaladddiv_hdr_icon").click();
    
    setTimeout(() => {
        const [year, month, day] = getElementById("zh-time-picker").value.split("-");
        
        const us = getElementById("zh-us-#-input").value;
        const dl = getElementById("zh-daily-log-input").value;
        const notes = getElementById("zh-task-description").value;

        const dateInput = getElementById("logdate");

        dateInput.value = `${month}-${day}-${year}`;
        const dayLogInput = getElementById("dailylog");
        if (dl.includes(":")) {
            dayLogInput.value = dl;
        } else if (dl.startsWith("0")) {
            dayLogInput.value = `00:${dl.substring(1)}`;
        } else {
            dayLogInput.value = `${dl}:00`;
        }

        let textareaValue = "";
        if (notes.split("Task ").length > 2) {
            textareaValue = "Sesión de trabajo realizando la programación necesaria para cumplir con el requerimiento asignado ejecutando las tareas: ";
            const tasksList = notes.split('Task ').filter(x => x).reduce((acc, nv, i, arr) => {
                if (i !== arr.length - 1) {
                    acc += `#${nv.trim()}, `;
                } else {
                    acc = `${acc.slice(0, -2)} y la tarea #${nv.trim()}.`;
                }
                return acc;
            }, "");
            textareaValue += tasksList;
        } else {
            const noteWithoutTask = notes.replace("Task ", "");
            textareaValue = `Sesión de trabajo realizando la programación necesaria para cumplir con el requerimiento asignado ejecutando la tarea #${noteWithoutTask}.`;
        }
        document.getElementsByTagName("textarea")[1].value = textareaValue;
        
        getElementById("tasksbugs").click();
        setTimeout(() => {
            const evt = new KeyboardEvent('keyup', { code: 32 });
            const input = getElementById("inputSearch");
            const assignTimeLog = document.getElementsByClassName("assign-timelog");
            input.value = us;
            input.dispatchEvent(evt);
            
            setTimeout(() => {
                if (assignTimeLog.length > 1) {
                    assignTimeLog[1].click();
                } else {
                    assignTimeLog[0].click();
                }
                setTimeout(() => {
                    getElementById("btn_1").click();
                }, 100)
            }, 1000)
        }, 1000)
    
        getElementById("zh-task-description").value = "";
    }, 1000);
}

displayZohoLogUI();


