const githubLink = "<a href='https://github.com/Bass2015'><i class='fa fa-github fa-2'></i></a>"

// Create the elements for Contact widget in the first footer
const followMeWidget = document.createElement("div");
followMeWidget.classList.add("col-md-3", "widget");

const followMeTitle = document.createElement("h3");
followMeTitle.classList.add("widget-title");
followMeTitle.textContent = "Follow me";

const followMeBody = document.createElement("div");
followMeBody.classList.add("widget-body");

const followMeInfo = document.createElement("p");
followMeInfo.classList.add("follow-me-icons");

followMeInfo.innerHTML = githubLink;

// Append the elements to the Contact widget
followMeBody.appendChild(followMeInfo);
followMeWidget.appendChild(followMeTitle);
followMeWidget.appendChild(followMeBody);

// Replace the existing Follow Me widget with the Contact widget in the first footer
const firstWidget = document.querySelector("#footer .row .col-md-3.widget:nth-child(1)");
firstWidget.parentNode.replaceChild(followMeWidget, firstWidget);


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
copyrightWidget.classList.add("col-md-6", "widget");

const copyrightBody = document.createElement("div");
copyrightBody.classList.add("widget-body");

const copyrightText = document.createElement("p");
copyrightText.classList.add("text-right");
copyrightText.textContent = "Copyright © 2022, Sebastián D.";

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
