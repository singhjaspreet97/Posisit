var userData=[];
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "users/get-data",
        data: "{}",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        cache: false,
        success: function (data) {
            console.log(data);
            userData=data;
            for(let user of userData) {
                $("#data-table").append("<tr><td>" +user.Date +"</td>"+"<td>" +user.data+ "</td>"+"<td>" +user.nodeNumber+ "</td></tr>" +user.nodeId+ "</td></tr>" +user.childNodeIdr+ "</td></tr>" +user.childrefId+ "</td></tr>" +user.ngenesisRefId+ "</td></tr>" +user.password+ "</td></tr>"); 
            }
        }
    });
});

