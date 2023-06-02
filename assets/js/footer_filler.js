const githubLink = "<a href='https://github.com/Bass2015'><i class='fa fa-github fa-2'></i></a>"
const whyAFox = 'The reason is the tale of the fox and the hedgehog and its \
                 interpretation in the book "The Signal and the Noise" by Nate Silver. In the book, Silver references \
                 philosopher Isaiah Berlin\'s essay, which divides people into two categories: foxes and hedgehogs. \
                 <br>Foxes are adaptable and open-minded individuals who draw upon a wide range of \
                 information. Hedgehogs, on the other hand, rely on a single big idea to interpret the world. \
                 Silver highlights the importance of being a fox-like thinker who embraces complexity\
                 and multiple viewpoints rather than being overly confident in one approach.'
const contact = '+34 658 11 98 21<br><a href="mailto:#">bass.dolg@gmail.com</a>'
const underfooterText = "Copyright © 2022, Sebastián D.";

const followMeWidget = createWidget("Follow me", githubLink, '3', 'follow-me-icons');
const whyAFoxWidget = createWidget("Why a fox?", whyAFox, '6', 'text')
const contactWidget = createWidget("Contact", contact, '3', 'text')
const footer = document.querySelector("#footer .container .row");
footer.appendChild(followMeWidget)
footer.appendChild(whyAFoxWidget)
footer.appendChild(contactWidget)



// ----------------------------
// Create the elements for the second footer
const underFooter = document.createElement("footer");
underFooter.id = "underfooter";

const underFooterContainer = document.createElement("div");
underFooterContainer.classList.add("container");

const underFooterRow = document.createElement("div");
underFooterRow.classList.add("row");

// Create the elements for the Copyright widget in the second footer
const copyrightWidget = document.createElement("div");
copyrightWidget.classList.add("col-md-12", "widget");

const copyrightBody = document.createElement("div");
copyrightBody.classList.add("widget-body");

const copyrightText = document.createElement("p");
copyrightText.classList.add("text-center");
copyrightText.textContent = underfooterText;

// Append the elements to the Copyright widget
copyrightBody.appendChild(copyrightText);
copyrightWidget.appendChild(copyrightBody);

// Append the Copyright widget to the second footer
underFooterRow.appendChild(copyrightWidget);
underFooterContainer.appendChild(underFooterRow);
underFooter.appendChild(underFooterContainer);

// Replace the existing second footer with the newly created one
const existingUnderFooter = document.querySelector("#underfooter");
existingUnderFooter.parentNode.replaceChild(underFooter, existingUnderFooter);

function createWidget(title, content, col_width, main_class="") {
    const newWidget = document.createElement("div");
    newWidget.classList.add("col-md-"+col_width, "widget");

    const titleTag = document.createElement("h3");
    titleTag.classList.add("widget-title");
    titleTag.textContent = title;

    const bodyTag = document.createElement("div");
    bodyTag.classList.add("widget-body");

    const bodyInfo = document.createElement("p");
    bodyInfo.classList.add(main_class);

    bodyInfo.innerHTML = content;

    // Append the elements to the Contact widget
    bodyTag.appendChild(bodyInfo);
    newWidget.appendChild(titleTag);
    newWidget.appendChild(bodyTag);
    return newWidget;
}

