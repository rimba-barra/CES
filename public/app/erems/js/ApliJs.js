var ApliJs = {
    applicationName: null, // nama aplikasi yang sedang aktif
    fieldId: null, // field yang dipakai sebagai primary id
    hello: function () {
        alert("Hello");
    },
    config: {
        LOADINGBAR_ZINDEX: 9999999,
    },
    //load html di panel Extjs
    loadHtml: function (extjsController, extjsPanel, viewName, viewParams={}) {
        /*
         $.get('/getdata?_=' + new Date().getTime(), function (data) {
         console.log(data);
         });
         */
        var me = this;
        me.applicationName = !me.applicationName ? "erems" : me.applicationName;

        $.get(document.URL + 'app/' + me.applicationName + '/viewms/' + extjsController.controllerName + '/' + viewName + '.html?_=' + new Date().getTime(), function (datatpl) {
            var output = Mustache.render(datatpl, viewParams);
            extjsPanel.body.update(output);
            var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender()';
            eval(myStrFunc);
        });

    },
    loadHtmlB: function (extjsController, extjsPanel, viewName, viewParams) {

        var me = this;
        me.applicationName = !me.applicationName ? "erems" : me.applicationName;

        $.get(document.URL + 'app/' + me.applicationName + '/viewms/' + extjsController.controllerName + '/' + viewName + '.html?_=' + new Date().getTime(), function (datatpl) {


            var output = Mustache.render(datatpl, viewParams);
            extjsPanel.body.update(output);

            var myStrFunc = 'extjsController.apliJsFunc' + viewName + '().afterRender(datatpl,viewParams)';
            eval(myStrFunc);
        });
    },

    showHtml: function (extjsController, viewName, viewParams, action) {

        var me = this;
        me.applicationName = !me.applicationName ? "erems" : me.applicationName;

        var ctName = extjsController.controllerName;
        var newId = ctName + '_' + viewName + '_ID';

        $.get(document.URL + 'app/' + me.applicationName + '/viewms/' + ctName + '/' + viewName + '.html?_=' + new Date().getTime(), function (datatpl) {


            var output = Mustache.render(datatpl, viewParams);
            // extjsPanel.body.update(output);

            if ($('#' + newId).length <= 0) {
                $('body').append(output);

                $('body .modal').last().attr("abc-modal-id", ctName + '_' + viewName);
                $('body .modal').last().attr("id", newId);

                var myStrFuncB = 'extjsController.apliJsFunc' + viewName + '(newId).init()';
                eval(myStrFuncB);

                var myStrFunc = 'extjsController.apliJsFunc' + viewName + '(newId).afterRender(datatpl,viewParams)';
                eval(myStrFunc);





                me.modal('#' + newId).init();



            }


            me.modal('#' + newId).show(action);





        });
    },
    
    showPhp: function (extjsController, viewName, content, modal, selector, modal_id, act_content) {
        
        var me = this;
        me.applicationName = !me.applicationName ? "erems" : me.applicationName;

        var ctName = extjsController.controllerName;
        var newId = ctName + '_' + viewName + '_ID';
                
                if (act_content == 'replace') {
                    $(selector).html(content);
                } else if (act_content == 'insert') {
                    $(modal_id).remove();
                    $(selector).append(content);
                }
                
                $(selector).last().attr("abc-modal-id", ctName + '_' + viewName);
//                $(selector).last().attr("id", newId);
//                $(selector).attr("abc-action", action);

                var myStrFuncB = 'extjsController.apliJsFunc' + viewName + '(newId).init()';
                eval(myStrFuncB);

                var myStrFunc = 'extjsController.apliJsFunc' + viewName + '(newId).afterRender()';
                eval(myStrFunc);
                
//                alert(modal);
                if (modal=='true'){
//                  alert('woy');
                    $(modal_id).modal({
                        show: true
                    });
                }

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
                    $("body").append('<div id="alertElId" class="alert alert-danger alert-dismissible fade show" style="top: 0px;position: absolute;width: 100%;z-index: ' + me.config.LOADINGBAR_ZINDEX + ';" role="alert">' +
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
    form: function (formSelector) {
        var me = this;
        var x = {
            removeValidationAttribute: function () {
                $(formSelector + ' input').each(function () {
                    $(this).css("border", "1px solid #ced4da");
                });
                $(formSelector + ' textarea').each(function () {
                    $(this).css("border", "1px solid #ced4da");
                });
            },
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


            },
            serialize: function () {
                var hasil = {};
                var dataForm = $(formSelector).serializeArray();
                var checkboxChecked = $(formSelector + ' input:checkbox:checked').serializeArray();
                var radioChecked = $(formSelector + ' input[type=radio]:checked');

                //  console.log(radioChecked);
                //  console.log($('input[name=posisi_berkasa]'));

                for (var j in dataForm) {

                    hasil[dataForm[j]["name"]] = dataForm[j]["value"];

                    // checkbox
                    for (var i in checkboxChecked) {
                        if (dataForm[j]["name"] === checkboxChecked[i]["name"]) {
                            dataForm[j]["value"] = 1;
                        }
                    }
                    // radio
                    for (var k in radioChecked) {

                        if (dataForm[j]["name"] === radioChecked[k]["name"]) {

                            dataForm[j]["value"] = $('input[name="' + dataForm[j]["name"] + '"]:checked', formSelector).val();

                        }
                    }

                    //var abcType = $(formSelector + " input[name=" + dataForm[j]["name"] + "]").attr("abc-type");

                    // abcdate
                    if ($(formSelector + " input[name=" + dataForm[j]["name"] + "]").hasClass("abcdate")) {
                        //  console.log(abcType);
                        var val = dataForm[j]["value"];
                        //console.log(val);
                        if (val) {
                            // jika formatnya DD-MM-YYYY
                            if (val.indexOf("-") <= 2) {
                                hasil[dataForm[j]["name"]] = moment(val, "DD-MM-YYYY").format("YYYY-MM-DD");
                            }

                        }

                    }


                }

                //console.log(hasil);
                return hasil;
            },
            loadData: function (data) {

                var dataForm = $(formSelector).serializeArray();


                for (var i in data) {
                    // console.log(pl[i]);
                    var el = $(formSelector + " [name='" + i + "']");

                    if (el.length > 0) {

                        if (el.attr("type") === "radio" || el.attr("type") === "checkbox") {

                        } else {
                            $(formSelector + " [name='" + i + "']").val(data[i]);
                        }
                    }
                }


                //fill checkbox
                $(formSelector + ' input[type=checkbox]').each(function () {
                    var name = $(this).attr("name");

                    if (name) {
                        if (data[name] === 1) {
                            $(this).prop('checked', true);
                        }
                    }
                    // $(this).val(accounting.formatMoney($(this).val()));
                });

                // fill radios
                var allRadios = [];

                $(formSelector + ' input[type=radio]').each(function () {
                    if (allRadios.indexOf($(this).attr("name")) < 0) {
                        allRadios.push($(this).attr("name"));
                    }
                });

                $(formSelector + ' input[name=posisi_berkasa]').removeAttr('checked');
                for (var i in allRadios) {
                    // console.log(allRadios[i]);
                    $('#' + allRadios[i] + '_' + data[allRadios[i]]).prop('checked', true);

                }

                // format currency
                $(formSelector + ' input.abcmoney').each(function () {
                    $(this).val(accounting.formatMoney($(this).val()));
                });


                // format date
                $(formSelector + ' input.abcdate').each(function () {
                    if ($(this).val()) {
                        var date = new Date($(this).val());
                        $(this).val(moment(date).format("DD-MM-YYYY"));
                    }
                });




            },
            resetValue: function () {
                var elId = $(formSelector).attr("id");
                if (elId) {
                    document.getElementById(elId).reset();
                }

                $(formSelector + ' input[name=' + me.fieldId + ']').val(0);
                $(formSelector).removeClass("was-validated");

                // balikin semua abcdate ke type text

                $(formSelector + ' input.abcdate').each(function () {
                    $(this).attr("type", "text");
                });
                console.log(formSelector + ' textarea');
                $(formSelector + ' textarea').each(function () {

                    // $(this).text(" asdas");
                });

            },
            isValid: function () {
                var form = document.getElementById($(formSelector).attr("id"));

                form.classList.add('was-validated');

                return form.checkValidity();
            },
            addDateEvent: function () {
                $(formSelector + ' input.abcdate').mouseenter(function () {

                    var val = $(this).val();
                    if (val) {
                        //  console.log(val);

                        if (val.indexOf("-") <= 2) {
                            $(this).val(moment(val, "DD-MM-YYYY").format("YYYY-MM-DD"));
                        }

                    }

                    $(this).attr("type", "date");

                });

                $(formSelector + ' input.abcdate').mouseleave(function () {


                    $(this).attr("type", "text");

                    if ($(this).val()) {
                        var date = new Date($(this).val());
                        $(this).val(moment(date).format("DD-MM-YYYY"));
                    }

                });
            }
        };

        return x;
    },
    grid: function (modalSelector) {
        var me = this;
        var x = {
            initEvent: function (gridId) {

                var modalId = modalSelector;
                $(modalId + " button[name=submit_search]").click(function (event) {
                    event.preventDefault();

                    //$(modalId + " button[name=submit_search]").prop('disabled', true);
                    // me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);

                    me.gridSelect[gridId].loadData(1, 25, 0);


                });

                $(modalId + " button[name=submit_reset]").click(function (event) {
                    event.preventDefault();

                    var elId = $(modalId + " form").attr("id");
                    if (elId) {
                        document.getElementById(elId).reset();
                    }

                    //$(modalId + " button[name=submit_search]").prop('disabled', true);
                    // me.apliJsFuncbrowse_unit_modal().loadData(1, 25, 0);
                    me.gridSelect[gridId].loadData(1, 25, 0);


                });

                /// update paging info
                $(modalId + " .mysuper_paging a.next").click(function (event) {
                    event.preventDefault();

                    var currentPage = parseInt($(modalId + " .mysuper_paging span.current_page").text());
                    var totalPage = parseInt($(modalId + " .mysuper_paging span.total_page").text());
                    if (currentPage < totalPage) {
                        //$(modalId + " button[name=submit_search]").prop('disabled', true);
                        var nextPage = currentPage + 1;
                        me.gridSelect[gridId].loadData(nextPage, 25, (nextPage - 1) * 25);
                        // me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                    }

                });

                $(modalId + " .mysuper_paging a.prev").click(function (event) {
                    event.preventDefault();

                    var currentPage = parseInt($(modalId + " .mysuper_paging span.current_page").text());
                    if (currentPage > 1) {
                        //$(modalId + " button[name=submit_search]").prop('disabled', true);

                        var nextPage = currentPage - 1;
                        // me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        me.gridSelect[gridId].loadData(nextPage, 25, (nextPage - 1) * 25);
                    }

                });

                $(modalId + " .mysuper_paging a.last").click(function (event) {
                    event.preventDefault();

                    var lastPage = parseInt($(modalId + " .mysuper_paging span.total_page").text());
                    if (lastPage > 0) {
                        //$(modalId + " button[name=submit_search]").prop('disabled', true);
                        var nextPage = lastPage;
                        //  me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        me.gridSelect[gridId].loadData(nextPage, 25, (nextPage - 1) * 25);
                    }

                });

                $(modalId + " .mysuper_paging a.first").click(function (event) {
                    event.preventDefault();

                    var lastPage = parseInt($(modalId + " .mysuper_paging span.total_page").text());
                    if (lastPage > 0) {
                        //$(modalId + " button[name=submit_search]").prop('disabled', true);
                        var nextPage = 1;
                        //  me.apliJsFuncbrowse_unit_modal().loadData(nextPage, 25, (nextPage - 1) * 25);
                        me.gridSelect[gridId].loadData(nextPage, 25, (nextPage - 1) * 25);
                    }

                });

                $(modalId + " table thead tr th input.abccheckbox_header").change(function () {
                   
                    $(modalId + " table tbody tr td input.abccheckbox_row").prop('checked', this.checked);
                });


            },
            updatePagingInfo: function (params) {

                var totalPage = 0;
                if (params.totalData > 0) {
                    totalPage = Math.ceil(params.totalData / params.limit);
                }

                if (params.data.length > 0) {
                    $(modalSelector + " .mysuper_paging span.current_page").text(params.page);
                    $(modalSelector + " .mysuper_paging span.total_page").text(totalPage);
                    $(modalSelector + " .mysuper_paging span.total_records").text("Total Record: " + params.totalData);

                } else {
                    $(modalSelector + " .mysuper_paging span.current_page").text(0);
                    $(modalSelector + " .mysuper_paging span.total_page").text(0);
                    $(modalSelector + " .mysuper_paging span.total_records").text("Total Record: 0");
                }
            }
        };
        return x;
    },
    gridSelect: {
        sampleGridId: {
            loadData: function () {

            }
        }
    },
    reset: function () {
        this.loadingbar().hide();
        $("#alertElId").alert('close');
    },
    modal: function (modalSelector) {
        var me = this;

        var x = {
            show: function (action) {
                //  console.log("show modal");

                me.reset();
                me.form(modalSelector + ' form').resetValue();


                $(modalSelector).attr("abc-action", action);

                $(modalSelector).modal({
                    show: true
                });



                $(modalSelector).draggable();






            },
            init: function () {
                // set event to abcdate
                me.form(modalSelector + ' form').addDateEvent();
            }
        };
        return x;
    },
    unvalidField: function (modalId, field) {
        if (field.length > 0) {

            $('#' + modalId + ' [name=' + field + ']').focus();
            $('#' + modalId + ' [name=' + field + ']').css("border", "1px solid red");
        }
    },

};


