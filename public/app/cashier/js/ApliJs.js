var ApliJs = {
    hello: function () {
        alert("Hello");
    },
    config: {
        LOADINGBAR_ZINDEX: 9999999,
    },
    //load html di panel Extjs
    loadHtml: function (extjsController, extjsPanel, viewName, viewParams) {
        $.ajax({url: document.URL + 'app/cashier/viewms/' + extjsController.controllerName + '/' + viewName + '.html', success: function (datatpl) {


                var output = Mustache.render(datatpl, viewParams);

                extjsPanel.body.update(output);

                var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender()';
                eval(myStrFunc);




            }, cache: false});
        /*  $.get(document.URL + 'app/cashier/viewms/' + extjsController.controllerName + '/' + viewName + '.html', function (datatpl) {
         
         
         var output = Mustache.render(datatpl, viewParams);
         
         extjsPanel.body.update(output);
         
         var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender()';
         eval(myStrFunc);
         
         
         
         
         });
         */
    },
    loadHtmlB: function (extjsController, extjsPanel, viewName, viewParams) {
        $.ajax({url: document.URL + 'app/cashier/viewms/' + extjsController.controllerName + '/' + viewName + '.html', success: function (datatpl) {


                var output = Mustache.render(datatpl, viewParams);
                extjsPanel.body.update(output);

                var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender(datatpl,viewParams)';
                eval(myStrFunc);




            }, cache: false});

    },
    loadHtmlC: function (extjsController, modalId, viewName, viewParams) {
        $.ajax({url: document.URL + 'app/cashier/viewms/' + extjsController.controllerName + '/' + viewName + '.html?_=' + new Date().getTime(), success: function (datatpl) {


                var output = Mustache.render(datatpl, viewParams);
                // extjsPanel.body.update(output);
                if ($(modalId).length <= 0) {
                    $('body').append(output);
                }

                var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender(datatpl,viewParams)';
                eval(myStrFunc);

            }, cache: false});

    },
    alertInfo: function (text, pakaiTombolSilang) {
        var html = '';
        html += '<div class="alert alert-info alert-dismissable">';
        if (pakaiTombolSilang) {
            html += '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>';
        }
        html += text;
        html += '</div>';
        return html;
    },
    alertSuccess: function (text) {
        return '<div class="alert alert-success alert-dismissable">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                text +
                '</div>';
    },
    alertWarning: function (text) {
        return '<div class="alert alert-warning alert-dismissable">' +
                '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                text +
                '</div>';
    },
    loadAjax: function (page, limit, start) {
        var modalId = "myModal";

        $.ajax({
            method: "POST",
            url: "erems/purchaseletter/read/",
            data: {start: start, page: page, limit: limit, mode_read: "unitlist", unit_number: $("#" + modalId + " input[name=unit_number]").val()}
        }).done(function (msg) {
            $("#" + modalId + " button[name=submit_search]").prop('disabled', false);

            var units = msg["data"];
            var totalData = msg["totalRow"];
            var totalPage = 0;
            if (totalData > 0) {
                totalPage = Math.ceil(totalData / limit);
            }

            //console.log(msg);
            var rows = "";
            for (var i in units) {
                rows += "<tr unit_id='" + units[i]["unit"]["unit_id"] + "'>" +
                        "<td>" + units[i]["unit"]["unit_number"] + "</td>" +
                        "<td>" + units[i]["cluster"]["cluster"] + "</td>" +
                        "<td>" + units[i]["type"]["name"] + "</td>" +
                        "<td><button class='btn btn-default btn-sm select_unit' unit_id='" + units[i]["unit"]["unit_id"] + "'>select</button></td>" +
                        "</tr>";
            }

            $("#plUnitListId tbody").html(rows);


            /// update paging info
            if (units.length > 0) {
                $("#" + modalId + " .mysuper_paging span.current_page").text(page);
                $("#" + modalId + " .mysuper_paging span.total_page").text(totalPage);
            } else {
                $("#" + modalId + " .mysuper_paging span.current_page").text(0);
                $("#" + modalId + " .mysuper_paging span.total_page").text(0);
            }



            // end update paging info

            /*
             $("#plUnitListId button.select_unit").click(function (event) {
             event.preventDefault();
             var unitId = $(this).attr("unit_id");
             me.unitSelectviaApli(unitId);
             //$("#" + modalId).hide();
             $('#' + modalId).modal('hide');
             
             
             });
             */



        });
    },
    loadingbar: function () {
        var x = {
            init: function () {
                var loadingBar = $("body").children("#inspayLoadingBarId");
                if (loadingBar.length === 0) {
                    $("body").append("<div id='inspayLoadingBarId' style='top: 0px;position: absolute;width: 100%;z-index: 9999;display:none;'><div class='loading-content' style='margin: auto;width: 300px;background-color: yellow;padding: 5px 20px;font-weight: bold;'>Loading...</div></div>");

                }
            },
            show: function (text) {
                $("#inspayLoadingBarId").show();
                $("#inspayLoadingBarId .loading-content").html(text);
            },
            hide: function () {
                $("#inspayLoadingBarId").hide();
            }
        };
        return x;
    },
    form: function (formSelector) {
        var x = {
            initEvent: function () {
                // untuk field money
                $(formSelector + ' input.abcmoney').each(function () {
                    //$(this).val(accounting.formatMoney($(this).val()));
                    $(this).blur(function () {
                        $(this).val(accounting.formatMoney($(this).val()));
                    });

                    $(this).focus(function () {
                        $(this).val(accounting.unformat($(this).val()));
                    });
                });


            }
        };
        return x;
    },
    alert: function () {
        var me = this;
        var x = {
            warning: function (text) {
                var alertEl = $("body").children("#alertElId");
                if (alertEl.length === 0) {
                    $("body").append('<div id="alertElId" class="alert alert-warning alert-dismissible fade show" style="top: 0px;position: absolute;width: 100%;z-index: ' + me.config.LOADINGBAR_ZINDEX + ';" role="alert">' +
                            '<div class="alert-content"><b>Warning : </b><span class="alert-text">' + text + '</span></div>' +
                            '<button type="button" class="close btn btn-sm" data-dismiss="alert" aria-label="Close" style="padding: 0 20px;">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>');


                } else {
                    $("#alertElId").show();
                    $("#alertElId .alert-text").html(text);
                }

                $("#alertElId").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertElId").slideUp(500);
                });
            },
            success: function (text) {
                var alertEl = $("body").children("#alertElId");
                if (alertEl.length === 0) {
                    $("body").append('<div id="alertElId" class="alert alert-success alert-dismissible fade show" style="top: 0px;position: absolute;width: 100%;z-index: ' + me.config.LOADINGBAR_ZINDEX + ';" role="alert">' +
                            '<div class="alert-content"><b>Success : </b><span class="alert-text">' + text + '</span></div>' +
                            '<button type="button" class="close btn btn-sm" data-dismiss="alert" aria-label="Close" style="padding: 0 20px;">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>');


                } else {
                    $("#alertElId").show();
                    $("#alertElId .alert-text").html(text);
                }

                $("#alertElId").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertElId").slideUp(500);
                });
            },
            error: function (text) {
                var alertEl = $("body").children("#alertElId");
                if (alertEl.length === 0) {
                    text = text?text:"Error ketika memproses permintaan Anda";
                    $("body").append('<div id="alertElId" class="alert alert-danger alert-dismissible fade show" style="top: 0px;position: absolute;width: 100%;z-index: ' + me.config.LOADINGBAR_ZINDEX + ';" role="alert">' +
                            '<div class="alert-content"><b>Success : </b><span class="alert-text">' + text + '</span></div>' +
                            '<button type="button" class="close btn btn-sm" data-dismiss="alert" aria-label="Close" style="padding: 0 20px;">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button>' +
                            '</div>');


                } else {
                    $("#alertElId").show();
                    $("#alertElId .alert-text").html(text);
                }

                $("#alertElId").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertElId").slideUp(500);
                });
            },
            remove: function () {
                $("body").children("#alertElId").remove();
            }
        };
        return x;
    },
    loadingbar: function () {
        var me = this;
        var x = {
            init: function () {
                var loadingBar = $("body").children("#inspayLoadingBarId");
                if (loadingBar.length === 0) {
                    $("body").append("<div id='inspayLoadingBarId' style='top: 0px;position: absolute;width: 100%;height:100%;z-index: " + me.config.LOADINGBAR_ZINDEX + ";display:none;'><div class='loading-content' style='margin: auto;width: 300px;background-color: yellow;padding: 5px 20px;font-weight: bold;'>Loading...</div></div>");

                }
            },
            show: function (text) {
                me.alert().remove();
                //   $('#alertElId').fade();
                $("#inspayLoadingBarId").show();
                $("#inspayLoadingBarId .loading-content").html(text);
            },
            hide: function () {
                $("#inspayLoadingBarId").hide();
            }
        };
        return x;
    },
};


