Ext.define('Erems.controller.Masterpricelist', {
    extend   : 'Erems.library.template.controller.Controlleralt',
    alias    : 'controller.Masterpricelist',
    views    : ['masterpricelist.Panel', 'masterpricelist.Grid', 'masterpricelist.FormSearch', 'masterpricelist.FormData', 'masterpricelist.GridDetail', 'masterpricelist.KoefisienGrid', 'masterpricelist.KoefisienGridDetail', 'masterpricelist.KoefisienClusterGrid'],
    stores   : ['Masterpricelist', 'Masterpricelistdetail', 'Masterparameterglobal', 'Unit', 'Masterkoefisien', 'Masterpricelistkoefisiengriddetail', 'MasterpricelistCluster', 'MasterpricelistType'],
    models   : ['Masterpricelist', 'Masterpricelistdetail', 'Masterparameterglobal', 'Unit', 'Masterkoefisien', 'Masterpricelistkoefisiengriddetail', 'MasterpricelistCluster', 'MasterpricelistType'],
    requires : ['Erems.library.DetailtoolAll', 'Erems.library.box.tools.Tools', 'Erems.library.box.Config'],
    refs     : [
        { ref : 'grid', selector : 'masterpricelistgrid' },
        { ref : 'formsearch', selector : 'masterpricelistformsearch' },
        { ref : 'formdata', selector : 'masterpricelistformdata' },
        { ref : 'griddetail', selector : 'masterpricelistgriddetail' },
        { ref : 'koefisiengrid', selector : 'masterpricelistkoefisiengrid' },
        { ref : 'koefisiengriddetail', selector : 'masterpricelistkoefisiengriddetail' },
        { ref : 'koefisienclustergrid', selector : 'masterpricelistkoefisienclustergrid' }
    ],
    detailTool1               : null,
    detailTool2               : null,
    controllerName            : 'masterpricelist',
    fieldName                 : 'pricelist',
    bindPrefixName            : 'Masterpricelist',
    formWidth                 : '100%',
    tools                     : null,
    myConfig                  : null,
    comboBoxIdEl              : [],
    NOPTKP                    : 0,
    isUsePPN                  : true,
    pembulatan1000            : false,
    ppn_value                 : 10,
    pembulatan_grossup        : 1,
    pembulatan_grossup_persen : 1,
    pembulatan_tanah          : 1,
    is_grossup_netto          : false,
    constructor               : function (configs) {
        this.callParent(arguments);

        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });
    },
    init: function (application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({ config: me.myConfig });

        if (typeof Mustache === "undefined") {
            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/mustache.min.js', function () {
                if (typeof ApliJs === "undefined") {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/js/ApliJs.js?_=' + new Date().getTime(), function () {

                        console.log("[INFO] ApliJs loaded.");

                    }, function () {
                        // error load file
                    });
                }
            }, function () {
                //  me.tools.alert.warning("Error load Prolibs.js file.");
            });
        }

        this.control({
            'masterpricelistpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender
            },
            'masterpricelistgrid': {
                afterrender     : this.gridAfterRender,
                // itemdblclick    : this.gridItemDblClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : this.gridSelectionChange
            },
            '#masterpricelistgrid_ctxMenu menuitem' : {
                click : function(el){
                    if(el.action == 'downloadaction'){
                        me.generateExcelByPricelistID();
                    }
                    else if(el.action == 'mailaction'){
                        me.sentEmailByPricelistID();
                    }
                    else if(el.action == 'copy'){
                        me.copyData();
                    }
                    else if(el.action == 'print'){
                        me.dataPrint();
                    }
                }
            },
            'masterpricelistgrid toolbar button': {
                click : function(el){
                    if(el.action == 'downloadaction'){
                        me.generateExcelByPricelistID();
                    }
                    else if(el.action == 'mailaction'){
                        me.sentEmailByPricelistID();
                    }
                    else if(el.action == 'copy'){
                        me.copyData();
                    }
                    else if(el.action == 'print'){
                        me.dataPrint();
                    }
                }
            },
            'masterpricelistgrid actioncolumn': {
                afterrender    : this.gridActionColumnAfterRender,
                click          : this.gridActionColumnClick,
                downloadaction : function () {
                    me.generateExcelByPricelistID();
                },
                mailaction : function () {
                    me.sentEmailByPricelistID();
                }
            },
            'masterpricelistformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'masterpricelistformsearch button[action=search]': {
                click: this.dataSearch
            },
            'masterpricelistformsearch button[action=reset]': {
                click: this.dataReset
            },
            'masterpricelistformdata': {
                beforerender: this.formDataBeforeRender,
                afterrender: this.formDataAfterRender
            },
            'masterpricelistformdata button[action=save]': {
                click: this.dataSave
            },
            'masterpricelistformdata button[action=cancel]': {
                click: this.formDataClose
            },
            // koefisien grid by unit section
            'masterpricelistkoefisiengrid': {
                // afterrender: this.getKoefisiengridAfterRender,
                beforerender: this.getKoefisiengridBeforeRender
            },
            'masterpricelistgriddetail': {
                // itemdblclick    : me.koefisienGrid.actionColumnClick,
                itemcontextmenu : this.gridItemContextMenu,
                selectionchange : function () {
                    var me   = this,
                        grid = me.getGriddetail(), 
                        row  = grid.getSelectionModel().getSelection();

                    grid.down('#btnView').setDisabled(row.length != 1);
                    grid.down('#btnEdit').setDisabled(row.length != 1);
                    grid.down('#btnDelete').setDisabled(row.length < 1);
                }
            },
            '#masterpricelistgriddetail_ctxMenu menuitem' : {
                click : function(el){
                    if(el.action == 'updateDetail' || el.action == 'readDetail'){
                        el.fireEvent('updateDetailgrid', el)
                    }
                    else if(el.action == 'destroyDetail'){
                        el.fireEvent('deleteDetailgrid', el)
                    }
                },
                updateDetailgrid : me.koefisienGrid.actionColumnClick,
                deleteDetailgrid : me.koefisienGrid.delete
            },
            'masterpricelistgriddetail toolbar button[action=create]': {
                click: function () {
                    var me, blockdata;
                    me = this;
                    me.detailTool2.form().show('create', 800, 'Add New Unit Pricelist', 'FormKoefisienGrid');
                }
            },
            'masterpricelistgriddetail toolbar button[action=updateDetail]': {
                click: me.koefisienGrid.actionColumnClick
            },
            'masterpricelistgriddetail toolbar button[action=destroyDetail]': {
                click: me.koefisienGrid.delete
            },
            'masterpricelistgriddetail toolbar button[action=generate]': {
                click: function () {
                    me = this;
                    me.detailTool1.form().show('create', 800, 'Add New Cluster Pricelist', 'FormKoefisienClusterGrid');
                }
            },
            'masterpricelistgriddetail toolbar button[action=readDetail]': {
                click : me.koefisienGrid.actionColumnClick,
            },
            'masterpricelistkoefisiengrid button[action=save]': {
                click: me.koefisienGrid.save
            },
            'masterpricelistkoefisiengrid button[action=browse_unit]': {
                click: function () {
                    ApliJs.showHtml(me, "browse_unit_modal", {}, 'browse_action');
                }
            },
            'masterpricelistkoefisiengrid checkboxfield[name=is_grossup]': {
                change: function (el) {
                    this.grossUpSelected(el);
                }
            },
            'masterpricelistkoefisiengrid checkboxfield[name=is_bphtb]': {
                change: function (el) {
                    me.genBiayaSurat('bphtb', el.getValue());
                }
            },
            'masterpricelistkoefisiengrid checkboxfield[name=is_ajb]': {
                change: function (el) {
                    me.genBiayaSurat('ajb', el.getValue());
                }
            },
            'masterpricelistkoefisiengrid checkboxfield[name=is_bbn]': {
                change: function (el) {
                    me.genBiayaSurat('bbn', el.getValue());
                }
            },
            'masterpricelistkoefisiengrid [name=harga_tanahmentahpermeter], masterpricelistkoefisiengrid [name=harga_tanahdevcostpermeter], masterpricelistkoefisiengrid [name=harga_tanahpermeter]': {
                keyup: function (el) {
                    me.calculateSaleable('tanah');
                }
            },
            'masterpricelistkoefisiengrid [name=harga_bangunanhpp], masterpricelistkoefisiengrid [name=harga_bangunanpermeter]': {
                keyup: function (el) {
                    me.calculateSaleable('bangunan');
                }
            },
            'masterpricelistkoefisienclustergrid [name=harga_tanahmentahpermeter], masterpricelistkoefisienclustergrid [name=harga_tanahdevcostpermeter], masterpricelistkoefisienclustergrid [name=harga_tanahpermeter]': {
                keyup: function (el) {
                    me.calculateSaleablecluster('tanah');
                }
            },
            'masterpricelistkoefisienclustergrid [name=harga_bangunanhpp], masterpricelistkoefisienclustergrid [name=harga_bangunanpermeter]': {
                keyup: function (el) {
                    me.calculateSaleablecluster('bangunan');
                }
            },
            'masterpricelistkoefisiengrid [name=grossup_persen], masterpricelistkoefisiengrid [name=spare]': {
                keyup: function (el) {
                    me.calculateUnitTotal();
                }
            },
            'masterpricelistkoefisienclustergrid': {
                // afterrender: this.formDataAfterRender,
                beforerender : this.getKoefisiengridBeforeRenderCluster,
                // afterrender  : this.getKoefisiengridAClusterfterRender
            },
            'masterpricelistkoefisienclustergrid [name=cluster_id]': {
                beforerender : this.getClusterByUnit,
                select       : this.clustergridSelectionChange
            },
            'masterpricelistkoefisienclustergrid [name=type_id]': {
                select : this.typegridSelectionChange
            },
            'masterpricelistkoefisienclustergrid button[action=save]': {
                click : me.koefisienGrid.saveCluster
            },
        });
    },
    panelAfterRender: function () {
        var me = this;
        ApliJs.gridSelect = {
            'browseUnit': {
                'loadData': function (page, limit, start) {
                    me.apliJsFuncbrowse_unit_modal('masterpricelist_browse_unit_modal_ID').loadData(page, limit, start);
                }
            }
        };

        me.tools.ajax({
            params  : {},
            success : function (data) {
                me.NOPTKP                    = data.NOPTKP;
                me.isUsePPN                  = data.isUsePPN;
                me.pembulatan1000            = data.pembulatan1000;
                me.USE_GROSSUP               = data.USE_GROSSUP;
                me.mkProlibFile              = data.PROLIBFILE;
                me.ppn_value                 = data.ppn_value;
                me.pembulatan_grossup        = data.pembulatan_grossup;
                me.pembulatan_grossup_persen = data.pembulatan_grossup_persen;
                me.pembulatan_tanah          = data.pembulatan_tanah;
                me.is_grossup_netto          = data.is_grossup_netto;

                if (me.mkProlibFile) {
                    Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/Prolibs.js?_dc=' + Ext.Date.now(), function () {
                        Ext.Loader.injectScriptElement(document.URL + 'app/erems/projectlibs/' + me.mkProlibFile + '.js?_dc=' + Ext.Date.now(), function () {
                        }, function () {
                            me.tools.alert.warning("Error load prolibs file.");
                        });
                    }, function () {
                        me.tools.alert.warning("Error load Prolibs.js file.");
                    });
                } else {
                    me.tools.alert.warning("[JSERR01] File Prolibs perhitungan biaya surat tidak ditemukan.");
                }
            }
        }).read('detailGenco');
    },
    //==== Form Koefisien Grid Detail ==========
    apliJsFuncbrowse_unit_modal: function (modalId) {
        var me = this;
        var x = {
            init: function () {
                ApliJs.grid('#' + modalId).initEvent('browseUnit');
            },
            formInit: function (callback) {
                $.ajax({
                    method : "POST",
                    url    : "erems/masterpricelist/read/",
                    data   : {mode_read: "forminit"}
                }).done(function (msg) {
                    var data = msg.data;

                    var cb = '<option value="0">ALL</option>';
                    for(var i=0;i<data.length;i++){
                       cb +='<option value="'+data[i].cluster_id+'">'+data[i].cluster+'</option>';
                    }

                    $('#'+modalId+' #cluster').html(cb);
                    callback();
                }).fail(function (msg) {
                    ApliJs.loadingbar().hide();
                    ApliJs.alert().error("Something problem when processing your request.");
                });
            },
            afterRender: function (tpl, params) {
                $('#' + modalId).on('shown.bs.modal', function () {
                    me.apliJsFuncbrowse_unit_modal(modalId).loadData(1, 25, 0);
                    me.apliJsFuncbrowse_unit_modal(modalId).formInit(function(){});
                });
            },
            loadData: function (page, limit, start) {
                var saya = this;
                $.ajax({
                    method : "POST",
                    url    : "erems/masterpricelist/read/",
                    data   : { start: start, page: page, limit: limit, mode_read: "unitlist", unit_number: $("#" + modalId + " input[name=unit_number]").val(), cluster: $("#" + modalId + " select[name=cluster]").val() }
                }).done(function (msg) {
                    $("#" + modalId + " button[name=submit_search]").prop('disabled', false);
                    var units = msg["data"];
                    var totalData = msg["total"];
                    var totalPage = 0;
                    if (totalData > 0) {
                        totalPage = Math.ceil(totalData / limit);
                    }
                    var rows = "";
                    var count = (page * limit) - limit + 1;
                    for (var i in units) {
                        rows += "<tr unit_id='" + units[i]["unit_id"] + "'>" +
                            "<td class='general' style='width:30px;'>" + count + "</td>" +
                            "<td style='width:70px;'>" + units[i]["unit_number"] + "</td>" +
                            "<td style='width:70px;'>" + units[i]["cluster_cluster"] + "</td>" +
                            "<td style='width:70px;'>" + units[i]["type_name"] + "</td>" +
                            "<td style='width:70px;'><button class='btn btn-primary btn-sm select_unit' unit_id='" + units[i]["unit_id"] + "'>choose</button></td>" +
                            "</tr>";
                        count++;
                    }
                    $("#plUnitListId tbody").html(rows);
                    $('#plUnitListId th').css('cursor', 'pointer');

                    var pg = 0, tpg = 0, tdata = 0;
                    if (units.length > 0) {
                        pg    = page;
                        tpg   = totalPage;
                        tdata = totalData;
                    }
                    $("#" + modalId + " .mysuper_paging span.current_page").text(page);
                    $("#" + modalId + " .mysuper_paging span.total_page").text(totalPage);
                    $("#" + modalId + " .mysuper_paging span.total_records").text("Total Record: " + totalData);

                    // end update paging info
                    $("#plUnitListId button.select_unit").click(function (event) {
                        event.preventDefault();
                        var unitId = $(this).attr("unit_id");
                        me.unitSelectviaApli(unitId);
                        $('#' + modalId).modal('hide');
                    });

                    $('th').click(function () {
                        var table = $(this).parents('table').eq(0)
                        var rows = table.find('tr:gt(0)').toArray().sort(me.comparer($(this).index()))
                        this.asc = !this.asc
                        if (!this.asc) { rows = rows.reverse() }
                        for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
                    })
                });
            },
        };
        return x;
    },
    comparer: function (index) {
        var me = this;
        return function (a, b) {
            var valA = me.getCellValue(a, index), valB = me.getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    },
    getCellValue: function (row, index) {
        return $(row).children('td').eq(index).text()
    },
    unitSelectviaApli: function (unitId) {
        var me = this,
            f  = me.getKoefisiengrid();

        $.ajax({
            method : "POST",
            url    : "erems/masterpricelist/read/",
            data   : { mode_read: "unitdetail", unit_id: unitId }
        }).done(function (msg) {
            var units = msg["data"];

            f.down("[name=unit_unit_id]").setValue(units[0].unit_id);
            f.down("[name=cluster_code]").setValue(units[0].cluster_code);
            f.down("[name=cluster_cluster]").setValue(units[0].cluster_cluster);
            f.down("[name=block_code]").setValue(units[0].block_code);
            f.down("[name=block_block]").setValue(units[0].block_block);
            f.down("[name=type_name]").setValue(units[0].type_name);
            f.down("[name=unit_land_size]").setValue(units[0].land_size);
            f.down("[name=unit_long]").setValue(units[0].long);
            f.down("[name=unit_building_size]").setValue(units[0].building_size);
            f.down("[name=unit_width]").setValue(units[0].width);
            f.down("[name=unit_unit_number]").setValue(units[0].unit_number);
            f.down("[name=purpose_purpose]").setValue(units[0].purpose);

            me.getFormdata().setLoading(false);

            var purpose   = units[0].purpose.toLowerCase(),
                fTanah    = f.down('#form_saleable_tanah').items.items,
                fBangunan = f.down('#form_saleable_bangunan').items.items;

            for (var x = 0; x < fTanah.length; x++){
                var field = fTanah[x].items.items[0];
                if(field.name != 'harga_tanahhpp' && field.name != 'margin_persen_tanah'){
                    var bool = false;
                    if(purpose.includes('apartment') || purpose.includes('office') || purpose.includes('soho')){
                        bool = true;
                    }
                    me.setFieldAllowBlank(f.down('[name=' + field.name + ']'), bool);

                }
            }

            for (var x = 0; x < fBangunan.length; x++){
                var field = fBangunan[x].items.items[0];
                if(field.name != 'margin_persen_bangunan'){
                    var bool = false;
                    if(purpose.includes('kavling')){
                        bool = true;
                    }
                    me.setFieldAllowBlank(f.down('[name=' + field.name + ']'), bool);
                }
            }
        });
    },
    getKoefisiengridBeforeRender: function (el, selectedId) {
        var me    = this,
            f     = me.getKoefisiengrid(),
            alArr = ['harga_netto_grossup', 'is_grossup', 'is_bphtb', 'is_bbn', 'is_ajb', 'markup'];

        for (var x = 0; x < alArr.length; x++) {
            if (me.USE_GROSSUP) {
                f.down("[name=" + alArr[x] + "]").show();
            }
            else{
                f.down("[name=" + alArr[x] + "]").hide();
            }
        }

        var win = f.up('window');
        if (win.state == 'create') {
            var kg = me.getKoefisiengriddetail();
            var storeKoefisiengriddetail = me.getMasterpricelistkoefisiengriddetailStore();
            storeKoefisiengriddetail.load({
                params: { mode_read: 'koefisienAllRead' },
                callback: function (rec, s) {
                    f.down('[name=genco_grossup]').setValue(me.pembulatan_grossup);
                    f.down('[name=genco_tanah]').setValue(me.pembulatan_tanah);
                    f.down('[name=genco_grossup_persen]').setValue(me.pembulatan_grossup_persen);

                    // added by rico 08022023
                    if(me.is_grossup_netto){
                        var grossup_persen = f.down('[name=grossup_persen]');
                        grossup_persen.show(); // added by rico 08022023
                        if(grossup_persen.getValue() <= 0){
                            grossup_persen.setValue(me.pembulatan_grossup_persen);
                        }
                    }
                    else{
                        f.down('[name=grossup_persen]').hide(); // added by rico 08022023
                    }

                    if (selectedId.id) {
                        var arrSelectedId = selectedId.id.split(",");
                        for (var i = 0; i < arrSelectedId.length; i++) {
                            storeKoefisiengriddetail.findBy(
                                function (record, id) {
                                    if (record.get('koefisien_id') === parseInt(arrSelectedId[i])) {
                                        kg.getSelectionModel().deselect(record.index, true);
                                        kg.getSelectionModel().select(record.index, true);
                                    }
                                }
                            );
                        }
                    }
                }
            });
        } 
        else {
            var kg      = me.getKoefisiengriddetail();
            var kgstore = kg.getStore();

            var is_grossup = f.down('[name=is_grossup]').getValue();
            var is_bphtb   = f.down('[name=is_bphtb]').getValue();
            var is_ajb     = f.down('[name=is_ajb]').getValue();
            var is_bbn     = f.down('[name=is_bbn]').getValue();

            var storeKoefisiengriddetail = me.getMasterpricelistkoefisiengriddetailStore();
            storeKoefisiengriddetail.load({
                params: { mode_read: 'koefisienAllRead' },
                callback: function (rec, s) {
                    f.down('[name=genco_grossup]').setValue(me.pembulatan_grossup);
                    f.down('[name=genco_tanah]').setValue(me.pembulatan_tanah);
                    f.down('[name=genco_grossup_persen]').setValue(me.pembulatan_grossup_persen);

                    if(me.is_grossup_netto){
                        var grossup_persen = f.down('[name=grossup_persen]');
                        grossup_persen.show(); // added by rico 08022023
                        if(grossup_persen.getValue() <= 0){
                            grossup_persen.setValue(me.pembulatan_grossup_persen);
                        }
                    }
                    else{
                        f.down('[name=grossup_persen]').hide(); // added by rico 08022023
                    }

                    kgstore.each(function (record, idx) {
                        var recd = kgstore.getAt(idx);
                        var bphtb = window[me.mkProlibFile].getBiayaBPHTB({
                            hrgNetto : accounting.unformat(f.down('[name=harga_netto_grossup]').getValue()),
                            landSize : f.down("[name=unit_land_size]").getValue()
                        });
                        var bbn = window[me.mkProlibFile].getBiayaBBNSertifikat({
                            hrgNetto : accounting.unformat(f.down('[name=harga_netto_grossup]').getValue()),
                            landSize : f.down("[name=unit_land_size]").getValue()
                        });

                        var ajb = window[me.mkProlibFile].getBiayaBAJB({
                            hrgNetto : accounting.unformat(f.down('[name=harga_netto_grossup]').getValue()),
                            landSize : f.down("[name=unit_land_size]").getValue()
                        });

                        if (is_bphtb == 1) {
                            recd.set("biaya_bphtb", bphtb);
                        }

                        if (is_ajb == 1) {
                            recd.set("biaya_ajb", ajb);
                        }

                        if (is_bbn == 1) {
                            recd.set("biaya_bbn", bbn);
                        }

                        if (selectedId.id) {
                            var arrSelectedId = selectedId.id.split(",");
                            for (var i = 0; i < arrSelectedId.length; i++) {
                                storeKoefisiengriddetail.findBy(
                                    function (record, id) {
                                        if (record.get('koefisien_id') === parseInt(arrSelectedId[i])) {
                                            kg.getSelectionModel().deselect(record.index, true);
                                            kg.getSelectionModel().select(record.index, true);
                                        }
                                    }
                                );
                            }
                        }
                    });
                }
            });
        }
    },
    getKoefisiengridBeforeRenderCluster: function (el, selectedId) {
        var me                       = this;
        var kg                       = me.getKoefisiengriddetail();
        var form                     = me.getKoefisienclustergrid();
        var storeKoefisiengriddetail = me.getMasterpricelistkoefisiengriddetailStore();

        storeKoefisiengriddetail.load({
            params: { mode_read: 'koefisienAllRead' },
            callback: function (rec, s) {
                var alArr = ['is_grossup', 'is_bphtb', 'is_bbn', 'is_ajb'];

                for (var x = 0; x < alArr.length; x++) {
                    if (me.pembulatan_grossup) {
                        form.down("[name=" + alArr[x] + "]").show();
                    }
                    else{
                        form.down("[name=" + alArr[x] + "]").hide();
                    }
                }

                if (selectedId.id) {
                    var arrSelectedId = selectedId.id.split(",");
                    for (var i = 0; i < arrSelectedId.length; i++) {
                        storeKoefisiengriddetail.findBy(
                            function (record, id) {
                                if (record.get('koefisien_id') === parseInt(arrSelectedId[i])) {
                                    kg.getSelectionModel().deselect(record.index, true);
                                    kg.getSelectionModel().select(record.index, true);
                                }
                            }
                        );
                    }
                }
            }
        });
    },
    saleable : function(fData, type='tanah'){
        if(type == 'tanah'){
            var mentah = toFloat(fData.down('[name=harga_tanahmentahpermeter]').getValue());
            var dev    = toFloat(fData.down('[name=harga_tanahdevcostpermeter]').getValue());

            fData.down('[name=harga_tanahhpp]').setValue(accounting.formatMoney(mentah+dev));

            var hpp        = toFloat(fData.down('[name=harga_tanahhpp]').getValue());
            var harga_jual = toFloat(fData.down('[name=harga_tanahpermeter]').getValue());

            var margin = hpp && harga_jual ? (1-(hpp/harga_jual)) * 100 : 0;

            fData.down('[name=margin_persen_tanah]').setValue(accounting.formatMoney(margin));
        }
        else if(type == 'bangunan'){
            var hpp        = toFloat(fData.down('[name=harga_bangunanhpp]').getValue());
            var harga_jual = toFloat(fData.down('[name=harga_bangunanpermeter]').getValue());

            var margin = hpp && harga_jual ? (1-(hpp/harga_jual)) * 100 : 0;

            fData.down('[name=margin_persen_bangunan]').setValue(accounting.formatMoney(margin));
        }
    },
    calculateSaleable : function(type='tanah'){ ///EST
        var me = this;

        me.saleable(me.getKoefisiengrid(), type);
        me.calculateUnitTotal();
    },
    calculateSaleablecluster : function(type='tanah'){ ///EST
        var me = this;

        me.saleable(me.getKoefisienclustergrid(), type);
    },
    calculateUnitTotal: function () {
        var me = this,
            f = me.getKoefisiengrid();
        
        //initiate input
        var unit_land_size             = toFloat(f.down('[name=unit_land_size]').getValue());
        var unit_building_size         = toFloat(f.down('[name=unit_building_size]').getValue());
        var harga_tanahpermeter        = toFloat(f.down('[name=harga_tanahpermeter]').getValue());
        var harga_bangunanpermeter     = toFloat(f.down('[name=harga_bangunanpermeter]').getValue());
        var harga_tanahdevcostpermeter = toFloat(f.down('[name=harga_tanahdevcostpermeter]').getValue());
        var harga_tanahmentahpermeter  = toFloat(f.down('[name=harga_tanahmentahpermeter]').getValue());
        var harga_bangunanhpp          = toFloat(f.down('[name=harga_bangunanhpp]').getValue());
        var harga_tanahhpp             = toFloat(harga_tanahdevcostpermeter) + toFloat(harga_tanahmentahpermeter);
        var margin_persen_tanah        = toFloat(f.down('[name=margin_persen_tanah]').getValue());
        var margin_persen_bangunan     = toFloat(f.down('[name=margin_persen_bangunan]').getValue());

        //Kotak Tanah
        var total_hargatanah          = harga_tanahpermeter * unit_land_size;
        var total_tanah_hpp           = harga_tanahhpp * unit_land_size;
        var harga_tanah_margin        = total_hargatanah - total_tanah_hpp;
        var harga_tanah_margin_persen = (harga_tanah_margin / total_hargatanah) * 100;

        f.down('[name=total_hargatanah]').setValue(accounting.formatMoney(total_hargatanah));
        f.down('[name=total_tanah_hpp]').setValue(accounting.formatMoney(total_tanah_hpp));
        f.down('[name=harga_tanah_margin]').setValue(accounting.formatMoney(harga_tanah_margin));
        f.down('[name=harga_tanah_margin_persen]').setValue(accounting.formatMoney(harga_tanah_margin_persen));
        
        //kotak Bangunan
        var total_hargabangunan          = harga_bangunanpermeter * unit_building_size;
        var total_bangunan_hpp           = harga_bangunanhpp * unit_building_size;
        var harga_bangunan_margin        = total_hargabangunan - total_bangunan_hpp;
        var harga_bangunan_margin_persen = (harga_bangunan_margin / total_hargabangunan) * 100;

        f.down('[name=total_hargabangunan]').setValue(accounting.formatMoney(total_hargabangunan));
        f.down('[name=total_bangunan_hpp]').setValue(accounting.formatMoney(total_bangunan_hpp));
        f.down('[name=harga_bangunan_margin]').setValue(accounting.formatMoney(harga_bangunan_margin));
        f.down('[name=harga_bangunan_margin_persen]').setValue(accounting.formatMoney(harga_bangunan_margin_persen));

        // added by rico 09112021
        //kotak Total
        
        var harga_netto            = total_hargatanah + total_hargabangunan;
        var total_hpptanahbangunan = total_tanah_hpp + total_bangunan_hpp;
        var total_margin           = harga_tanah_margin + harga_bangunan_margin;
        var persentase_margin      = (margin_persen_tanah + margin_persen_bangunan) / 2;

        var harga_netto_grossup = 0, is_bphtb = 0, is_ajb = 0, is_bbn = 0;

        if (me.getKoefisiengrid().down('[name=is_grossup]').getValue() == 1) {
            var genco_grossup       = toFloat(f.down('[name=genco_grossup]').getValue());
            var grossup_persen      = toFloat(f.down('[name=grossup_persen]').getValue() > 0 ? f.down('[name=grossup_persen]').getValue() : f.down('[name=genco_grossup_persen]').getValue());
            
            harga_netto_grossup = Math.ceil((harga_netto / (1-(grossup_persen/100))) / genco_grossup) * genco_grossup;

            if(f.down('[name=is_bphtb]').getValue() == 1){ is_bphtb = 1; }
            if(f.down('[name=is_ajb]').getValue() == 1){ is_ajb = 1; }
            if(f.down('[name=is_bbn]').getValue() == 1){ is_bbn = 1; }
        } 

        f.down('[name=harga_netto_grossup]').setValue(accounting.formatMoney(harga_netto_grossup));

        f.down('[name=is_bphtb]').setValue(is_bphtb);
        f.down('[name=is_ajb]').setValue(is_ajb);
        f.down('[name=is_bbn]').setValue(is_bbn);

        me.genBiayaSurat('bphtb', is_bphtb);
        me.genBiayaSurat('ajb', is_ajb);
        me.genBiayaSurat('bbn', is_bbn);

        f.down('[name=harga_netto]').setValue(accounting.formatMoney(harga_netto));
        f.down('[name=total_hpptanahbangunan]').setValue(accounting.formatMoney(total_hpptanahbangunan));
        f.down('[name=total_margin]').setValue(accounting.formatMoney(total_margin));
        f.down('[name=persentase_margin]').setValue(accounting.formatMoney(persentase_margin));

        var total_harga_jual = harga_netto + ((harga_netto * accounting.unformat(f.down('[name=spare]').getValue()))/100);
        f.down('[name=total_harga_jual]').setValue(accounting.formatMoney(total_harga_jual));
    },
    koefisienGrid : {
        that            : this,
        editingIndexRow : 0,
        clickIndexRow   : [],
        save            : function () {
            var me        = this,
                f         = me.getKoefisiengrid(),
                form      = f.getForm(),
                formVal   = form.getValues(),
                fTanah    = f.down('#form_saleable_tanah').items.items,
                fBangunan = f.down('#form_saleable_bangunan').items.items,
                arrValid  = ['', null, 0];

            for (var x = 0; x < fTanah.length; x++){
                var field = fTanah[x].items.items[0],
                    value = accounting.unformat(field.getValue());

                if(field.name != 'harga_tanahhpp' && field.name != 'margin_persen_tanah'){
                    if(field.allowBlank == false && arrValid.includes(value)){
                        me.tools.alert.warning(field.fieldLabel + " tanah Harus diisi..");
                        return;
                    }
                }
            }

            for (var x = 0; x < fBangunan.length; x++){
                var field = fBangunan[x].items.items[0],
                    value = accounting.unformat(field.getValue());

                if(field.name != 'margin_persen_bangunan'){
                    if(field.allowBlank == false && arrValid.includes(value)){
                        me.tools.alert.warning(field.fieldLabel + " bangunan Harus diisi..");
                        return;
                    }
                }
            }

            var checkNetto = toFloat(formVal.harga_netto);
            if (form.isValid() && checkNetto != 0) {
                var win = me.getKoefisiengrid().up('window');

                var gridDetail         = me.getGriddetail(),
                    dStore             = gridDetail.getStore(),
                    gridKoefisienVal   = me.getKoefisiengriddetail(),
                    gridKoefisienStore = gridKoefisienVal.getStore();

                var val = {
                    pricelist_detail_id          : formVal.pricelist_detail_id,
                    pricelist_id                 : formVal.pricelist_id,
                    unit_id                      : formVal.unit_unit_id,
                    cluster                      : formVal.cluster_cluster,
                    cluster_code                 : formVal.cluster_code,
                    unit_number                  : formVal.unit_unit_number,
                    type_name                    : formVal.type_name,
                    land_size                    : toFloat(formVal.unit_land_size),
                    building_size                : toFloat(formVal.unit_building_size),
                    keterangan_unit              : formVal.keterangan_unit,
                    is_grossup                   : formVal.is_grossup,
                    is_bphtb                     : formVal.is_bphtb,
                    is_ajb                       : formVal.is_ajb,
                    is_bbn                       : formVal.is_bbn,
                    harga_netto_grossup          : toFloat(formVal.harga_netto_grossup),
                    harga_tanahpermeter          : toFloat(formVal.harga_tanahpermeter),
                    harga_bangunanpermeter       : toFloat(formVal.harga_bangunanpermeter),
                    total_hargatanah             : toFloat(formVal.total_hargatanah),
                    total_hargabangunan          : toFloat(formVal.total_hargabangunan),
                    harga_netto                  : toFloat(formVal.harga_netto),
                    harga_tanahdevcostpermeter   : toFloat(formVal.harga_tanahdevcostpermeter),
                    harga_tanahmentahpermeter    : toFloat(formVal.harga_tanahmentahpermeter),
                    harga_tanahhpp               : toFloat(formVal.harga_tanahhpp),
                    harga_tanah_margin           : toFloat(formVal.harga_tanah_margin),
                    harga_tanah_margin_persen    : toFloat(formVal.harga_tanah_margin_persen),
                    harga_bangunan_margin        : toFloat(formVal.harga_bangunan_margin),
                    harga_bangunan_margin_persen : toFloat(formVal.harga_bangunan_margin_persen),
                    harga_bangunanhpp            : toFloat(formVal.harga_bangunanhpp),
                    total_tanah_hpp              : typeof formVal.total_tanah_hpp != 'undefined' ? toFloat(formVal.total_tanah_hpp) : 0,
                    total_bangunan_hpp           : typeof formVal.total_bangunan_hpp != 'undefined' ? toFloat(formVal.total_bangunan_hpp) : 0,
                    total_hpptanahbangunan       : toFloat(formVal.total_hpptanahbangunan),
                    total_margin                 : toFloat(formVal.total_margin),
                    persentase_margin            : toFloat(formVal.persentase_margin),
                    grossup_persen               : toFloat(formVal.grossup_persen),
                    markup                       : toFloat(formVal.markup),
                    margin_persen_tanah          : toFloat(formVal.margin_persen_tanah),
                    margin_persen_bangunan       : toFloat(formVal.margin_persen_bangunan),
                    spare                        : toFloat(formVal.spare),
                    total_harga_jual             : toFloat(formVal.total_harga_jual),
                };

                //check unit ada di store apa tidak
                if (win.state == 'create') {
                    var checkUnit = dStore.findRecord('unit_id', val['unit_id']);
                    if (checkUnit != null) {
                        me.tools.alert.warning("Unit sudah ada di list");
                        return;
                    }
                } else if (win.state == 'update') {
                    var rec = dStore.getAt(me.koefisienGrid.editingIndexRow);
                    if (rec.data['unit_id'] != val['unit_id']) {
                        var checkUnit = dStore.findRecord('unit_id', val['unit_id']);
                        if (checkUnit != null) {
                            me.tools.alert.warning("Unit sudah ada di list");
                            return;
                        }
                    }
                }

                var data_koefisien_id                            = [],
                    data_koefisien_nama                          = [],
                    data_koefisien_val                           = [],
                    data_koefisien                               = [],
                    data_koefisien_biaya_asuransi                = [],
                    data_koefisien_biaya_bphtb                   = [],
                    data_koefisien_biaya_bbn                     = [],
                    data_koefisien_biaya_ajb                     = [],
                    data_koefisien_biaya_administrasi            = [],
                    data_koefisien_asuransi_nominal_persen       = [],
                    data_koefisien_bphtb_nominal_persen          = [],
                    data_koefisien_bbn_nominal_persen            = [],
                    data_koefisien_ajb_nominal_persen            = [],
                    data_koefisien_administrasi_nominal_persen   = [],
                    data_koefisien_biaya_admsubsidi              = [],
                    data_koefisien_admsubsidi_nominal_persen     = [],
                    data_koefisien_biaya_pmutu                   = [],
                    data_koefisien_pmutu_nominal_persen          = [],
                    data_koefisien_biaya_paket_tambahan          = [],
                    data_koefisien_paket_tambahan_nominal_persen = [];

                //detail koefisien grid yang dipilih
                var selectedKoefisien = gridKoefisienVal.getSelectionModel().getSelection();
                Ext.iterate(selectedKoefisien, function (koefisien_id, index) {
                    var record = gridKoefisienStore.getAt(gridKoefisienStore.indexOf(gridKoefisienVal.getSelectionModel().getSelection()[index]));

                    data_koefisien.push(gridKoefisienStore.indexOf(index));
                    data_koefisien_id.push(record.data.koefisien_id);
                    data_koefisien_nama.push(record.data.pricelist);
                    data_koefisien_val.push(record.data.koefisien);
                    data_koefisien_biaya_asuransi.push(record.data.biaya_asuransi);
                    data_koefisien_biaya_bphtb.push(record.data.biaya_bphtb);
                    data_koefisien_biaya_bbn.push(record.data.biaya_bbn);
                    data_koefisien_biaya_ajb.push(record.data.biaya_ajb);
                    data_koefisien_biaya_administrasi.push(record.data.biaya_administrasi);
                    data_koefisien_asuransi_nominal_persen.push(record.data.asuransi_nominal_persen);
                    data_koefisien_bphtb_nominal_persen.push(record.data.bphtb_nominal_persen);
                    data_koefisien_bbn_nominal_persen.push(record.data.bbn_nominal_persen);
                    data_koefisien_ajb_nominal_persen.push(record.data.ajb_nominal_persen);
                    data_koefisien_administrasi_nominal_persen.push(record.data.administrasi_nominal_persen);
                    data_koefisien_biaya_admsubsidi.push(record.data.biaya_admsubsidi);
                    data_koefisien_admsubsidi_nominal_persen.push(record.data.admsubsidi_nominal_persen);
                    data_koefisien_biaya_pmutu.push(record.data.biaya_pmutu);
                    data_koefisien_pmutu_nominal_persen.push(record.data.pmutu_nominal_persen);
                    data_koefisien_biaya_paket_tambahan.push(record.data.biaya_paket_tambahan);
                    data_koefisien_paket_tambahan_nominal_persen.push(record.data.paket_tambahan_nominal_persen);
                }); 

                me.generateGridDynamicly(gridDetail, dStore, val, data_koefisien, data_koefisien_id, data_koefisien_nama, data_koefisien_val, data_koefisien_biaya_ajb, data_koefisien_biaya_administrasi, data_koefisien_biaya_bbn, data_koefisien_biaya_bphtb, data_koefisien_biaya_asuransi, data_koefisien_asuransi_nominal_persen, data_koefisien_bphtb_nominal_persen, data_koefisien_bbn_nominal_persen, data_koefisien_ajb_nominal_persen, data_koefisien_administrasi_nominal_persen, data_koefisien_biaya_admsubsidi, data_koefisien_admsubsidi_nominal_persen, data_koefisien_biaya_pmutu, data_koefisien_pmutu_nominal_persen, data_koefisien_biaya_paket_tambahan, data_koefisien_paket_tambahan_nominal_persen);
                gridDetail.getView().refresh();

                val['list_koefisien_id'] = data_koefisien_id;
                //end

                if (win.state == 'create') {
                    var checkUnit = dStore.findRecord('unit_id', val['unit_id']);
                    if (checkUnit === null) {
                        dStore.add(val);
                        win.close();
                    } else {
                        me.tools.alert.warning("Unit sudah ada di list");
                        return;
                    }
                } 
                else if (win.state == 'update') {
                    var rec = me.getGriddetail().getStore().getAt(me.koefisienGrid.editingIndexRow);

                    if (rec.data['unit_id'] != val['unit_id']) {
                        var checkUnit = dStore.findRecord('unit_id', val['unit_id']);
                        if (checkUnit === null) {
                            rec.beginEdit();
                            rec.set(val);
                            rec.endEdit();
                            win.close();
                        } else {
                            me.tools.alert.warning("Unit sudah ada di list");
                            return;
                        }
                    } 
                    else {
                        var myRegexpGross = /KoefisienId_gross_(.*)/;
                        var myRegexpNetto = /KoefisienId_netto_(.*)/;
                        for (var key in rec.data) {
                            var check_koefisien_gross = myRegexpGross.exec(key);
                            if (Array.isArray(check_koefisien_gross)) {
                                var checkChoosenKoefisien = data_koefisien_id.indexOf(parseInt(check_koefisien_gross[1]));
                                if (data_koefisien_id.indexOf(parseInt(check_koefisien_gross[1])) < 0) {
                                    val[key] = "";
                                }
                            }
                            var check_koefisien_netto = myRegexpNetto.exec(key);
                            if (Array.isArray(check_koefisien_netto)) {
                                var checkChoosenKoefisien = data_koefisien_id.indexOf(parseInt(check_koefisien_netto[1]));
                                if (data_koefisien_id.indexOf(parseInt(check_koefisien_netto[1])) < 0) {
                                    val[key] = "";
                                }
                            }
                        }

                        rec.beginEdit();
                        rec.set(val);
                        rec.endEdit();
                        win.close();
                    }

                    gridDetail.getSelectionModel().deselect(me.koefisienGrid.editingIndexRow, true);
                    gridDetail.getSelectionModel().select(me.koefisienGrid.editingIndexRow, true);
                } 
            } 
        },
        saveCluster: function () {
            var me        = this, 
                f         = me.getKoefisienclustergrid(),
                form      = f.getForm(), 
                formVal   = form.getValues(),
                storetype = me.getMasterpricelistTypeStore(),
                msg       = '';

            var arrF = [
                {key : 'harga_tanahmentahpermeter', label : 'Mentah'},
                {key : 'harga_tanahdevcostpermeter', label : 'Dev Cost'},
                {key : 'harga_tanahhpp', label : 'HPP Tanah'},
                {key : 'harga_tanahpermeter', label : 'Harga Jual Tanah'},
                {key : 'harga_bangunanhpp', label : 'HPP Bangunan'},
                {key : 'harga_bangunanpermeter', label : 'Harga Jual Bangunan'},
            ];

            console.log(form.isValid())

            for (var i in arrF) {
                var fid = me.getKoefisienclustergrid().down('[name='+arrF[i].key+']');
                if(!fid.allowBlank && toFloat(fid.getValue()) == 0){
                    this.tools.alert.warning(arrF[i].label + " Harus diisi..");
                    return;
                }
            }

            if (form.isValid()) {
                var win = me.getKoefisienclustergrid().up('window');

                var gridDetail         = me.getGriddetail(),
                    dStore             = gridDetail.getStore(),
                    gridKoefisienVal   = me.getKoefisiengriddetail(),
                    gridKoefisienStore = gridKoefisienVal.getStore();

                var data_koefisien_id                            = [],
                    data_koefisien_nama                          = [],
                    data_koefisien_val                           = [],
                    data_koefisien                               = [],
                    data_koefisien_biaya_asuransi                = [],
                    data_koefisien_biaya_bphtb                   = [],
                    data_koefisien_biaya_bbn                     = [],
                    data_koefisien_biaya_ajb                     = [],
                    data_koefisien_biaya_administrasi            = [],
                    data_koefisien_asuransi_nominal_persen       = [],
                    data_koefisien_bphtb_nominal_persen          = [],
                    data_koefisien_bbn_nominal_persen            = [],
                    data_koefisien_ajb_nominal_persen            = [],
                    data_koefisien_administrasi_nominal_persen   = [],
                    data_koefisien_biaya_admsubsidi              = [],
                    data_koefisien_admsubsidi_nominal_persen     = [],
                    data_koefisien_biaya_pmutu                   = [],
                    data_koefisien_pmutu_nominal_persen          = [],
                    data_koefisien_biaya_paket_tambahan          = [],
                    data_koefisien_paket_tambahan_nominal_persen = [];

                var selectedKoefisien = gridKoefisienVal.getSelectionModel().getSelection();
                Ext.iterate(selectedKoefisien, function (koefisien_id, index) {
                    var record = gridKoefisienStore.getAt(gridKoefisienStore.indexOf(gridKoefisienVal.getSelectionModel().getSelection()[index]));
                    data_koefisien.push(gridKoefisienStore.indexOf(index));
                    data_koefisien_id.push(record.data.koefisien_id);
                    data_koefisien_nama.push(record.data.pricelist);
                    data_koefisien_val.push(record.data.koefisien);
                    data_koefisien_biaya_asuransi.push(record.data.biaya_asuransi);
                    data_koefisien_biaya_bphtb.push(record.data.biaya_bphtb);
                    data_koefisien_biaya_bbn.push(record.data.biaya_bbn);
                    data_koefisien_biaya_ajb.push(record.data.biaya_ajb);
                    data_koefisien_biaya_administrasi.push(record.data.biaya_administrasi);
                    data_koefisien_asuransi_nominal_persen.push(record.data.asuransi_nominal_persen);
                    data_koefisien_bphtb_nominal_persen.push(record.data.bphtb_nominal_persen);
                    data_koefisien_bbn_nominal_persen.push(record.data.bbn_nominal_persen);
                    data_koefisien_ajb_nominal_persen.push(record.data.ajb_nominal_persen);
                    data_koefisien_administrasi_nominal_persen.push(record.data.administrasi_nominal_persen);
                    data_koefisien_biaya_admsubsidi.push(record.data.biaya_admsubsidi);
                    data_koefisien_admsubsidi_nominal_persen.push(record.data.admsubsidi_nominal_persen);
                    data_koefisien_biaya_pmutu.push(record.data.biaya_pmutu);
                    data_koefisien_pmutu_nominal_persen.push(record.data.pmutu_nominal_persen);
                    data_koefisien_biaya_paket_tambahan.push(record.data.biaya_paket_tambahan);
                    data_koefisien_paket_tambahan_nominal_persen.push(record.data.paket_tambahan_nominal_persen);
                });

                me.getFormdata().setLoading('Sedang memproses list Unit');

                var unitListAlert = "";

                $.ajax({
                    method : "POST",
                    url    : "erems/masterpricelist/read/",
                    data   : { mode_read: "generateUnit", cluster_id: formVal.cluster_id, type_id: formVal.type_id }
                }).done(function (msg) {
                    var unitList = msg.data;
                    for (var i = 0; i < unitList.length; i++) {
                        var checkUnit = dStore.findRecord('unit_id', unitList[i].unit_id); // ========== check unit udah ada atau belum di grid ==========================
                        if (checkUnit === null) {
                            var val = {
                                unit_id                    : unitList[i].unit_id,
                                cluster                    : unitList[i].cluster_cluster,
                                cluster_code               : unitList[i].cluster_code,
                                unit_number                : unitList[i].unit_number,
                                type_name                  : unitList[i].type_name,
                                land_size                  : toFloat(unitList[i].land_size),
                                building_size              : toFloat(unitList[i].building_size),
                                harga_tanahpermeter        : toFloat(formVal.harga_tanahpermeter),
                                harga_bangunanpermeter     : toFloat(formVal.harga_bangunanpermeter),
                                harga_tanahdevcostpermeter : toFloat(formVal.harga_tanahdevcostpermeter),
                                harga_tanahmentahpermeter  : toFloat(formVal.harga_tanahmentahpermeter),
                                harga_tanahhpp             : toFloat(formVal.harga_tanahhpp),
                                harga_bangunanhpp          : toFloat(formVal.harga_bangunanhpp),
                                is_grossup                 : formVal.is_grossup,
                                is_bphtb                   : formVal.is_grossup == 1 ? formVal.is_bphtb : 0,
                                is_ajb                     : formVal.is_grossup == 1 ? formVal.is_ajb : 0,
                                is_bbn                     : formVal.is_grossup == 1 ? formVal.is_bbn : 0,
                                spare                      : toFloat(formVal.spare)
                            };

                            val['total_hargatanah']             = toFloat(val['harga_tanahpermeter'] * val['land_size']);
                            val['total_tanah_hpp']              = toFloat(val['harga_tanahhpp'] * val['land_size']);
                            val['harga_tanah_margin']           = toFloat(val['total_hargatanah'] - val['total_tanah_hpp']);
                            val['harga_tanah_margin_persen']    = toFloat(((val['harga_tanah_margin'] / val['total_hargatanah']) * 100).toFixed(2));
                            val['margin_persen_tanah']          = toFloat((val['harga_tanahhpp'] && val['harga_tanahpermeter'] ? (1-(val['harga_tanahhpp'] / val['harga_tanahpermeter'])) * 100 : 0).toFixed(2));
                            val['total_hargabangunan']          = toFloat(val['harga_bangunanpermeter'] * val['building_size']);
                            val['total_bangunan_hpp']           = toFloat(val['harga_bangunanhpp'] * val['building_size']);
                            val['harga_bangunan_margin']        = toFloat(val['total_hargabangunan'] - val['total_bangunan_hpp']);
                            val['harga_bangunan_margin_persen'] = toFloat(((val['harga_bangunan_margin'] / val['total_hargabangunan']) * 100).toFixed(2));
                            val['margin_persen_bangunan']       = toFloat((val['harga_bangunanhpp'] && val['harga_bangunanpermeter'] ? (1-(val['harga_bangunanhpp'] / val['harga_bangunanpermeter'])) * 100 : 0).toFixed(2));
                            val['harga_netto']                  = toFloat((val['total_hargatanah'] + val['total_hargabangunan']).toFixed(2));
                            val['total_harga_jual']             = toFloat((val['harga_netto'] + ((val['harga_netto'] * val['spare']) / 100)).toFixed(2));

                            val['harga_netto_grossup'] = 0;
                            val['grossup_persen']      = 0;
                            val['markup']              = 0;
                            if (val['is_grossup'] == 1) {
                                var genco_grossup  = toFloat(f.down('[name=genco_grossup]').getValue());
                                var grossup_persen = toFloat(f.down('[name=grossup_persen]').getValue() > 0 ? f.down('[name=grossup_persen]').getValue() : f.down('[name=genco_grossup_persen]').getValue());
                                
                                val['grossup_persen']      = grossup_persen;
                                val['harga_netto_grossup'] = toFloat((Math.ceil((val['harga_netto'] / (1-(grossup_persen/100))) / genco_grossup) * genco_grossup).toFixed(2));
                            }

                            val['total_hpptanahbangunan'] = toFloat(val['total_tanah_hpp'] + val['total_bangunan_hpp']);
                            val['total_margin']           = toFloat(val['harga_netto'] - val['total_hpptanahbangunan']);
                            val['persentase_margin']      = toFloat(((val['harga_tanah_margin_persen'] + val['harga_bangunan_margin_persen']) / 2).toFixed(2));

                            //detail koefisien grid yang dipilih
                            me.generateGridDynamicly(gridDetail, dStore, val, data_koefisien, data_koefisien_id, data_koefisien_nama, data_koefisien_val, data_koefisien_biaya_ajb, data_koefisien_biaya_administrasi, data_koefisien_biaya_bbn, data_koefisien_biaya_bphtb, data_koefisien_biaya_asuransi, data_koefisien_asuransi_nominal_persen, data_koefisien_bphtb_nominal_persen, data_koefisien_bbn_nominal_persen, data_koefisien_ajb_nominal_persen, data_koefisien_administrasi_nominal_persen, data_koefisien_biaya_admsubsidi, data_koefisien_admsubsidi_nominal_persen, data_koefisien_biaya_pmutu, data_koefisien_pmutu_nominal_persen, data_koefisien_biaya_paket_tambahan, data_koefisien_paket_tambahan_nominal_persen);
                            gridDetail.getView().refresh();

                            val['list_koefisien_id'] = data_koefisien_id;
                            //end

                            if (win.state == 'create') {
                                dStore.add(val);
                            }
                        }
                        else {
                            unitListAlert += unitList[i].unit_number + ', ';
                        }
                    }

                    me.getFormdata().setLoading(false);

                    if(unitList.length == 0){
                        Ext.Msg.show({
                            title   : 'Failure',
                            msg     : "Tidak ada unit yang bisa di generate pada 'Cluster " + me.getKoefisienclustergrid().down('[name=cluster_id]').rawValue + ", Type " + me.getKoefisienclustergrid().down('[name=type_id]').rawValue + "'",
                            icon    : Ext.Msg.ERROR,
                            buttons : Ext.Msg.OK
                        });
                    }
                    else{
                        if (unitListAlert != "") {
                            Ext.Msg.show({
                                title   : 'Success',
                                msg     : "Unit " + unitListAlert.replace(/,\s*$/, "") + " sudah ada di list",
                                icon    : Ext.Msg.INFO,
                                buttons : Ext.Msg.OK
                            });
                        }
                    }
                });
                win.close();
            }
            else {
                me.tools.alert.warning("Silahkan check isian form terlebih dahulu.");
                return;
            }
        },
        actionColumnClick: function (view) {
            var me     = this,
                gr     = me.getGriddetail(),
                record = gr.getSelectionModel().getSelection();


            if(record.length){
                var indexKoefisienGridSelect = gr.getStore().find('unit_id', record[0].data.unit_id);

                gr.getSelectionModel().deselect(indexKoefisienGridSelect, true);
                gr.getSelectionModel().select(indexKoefisienGridSelect, true);

                var title   = 'Edit';
                var is_view = false;
                if(typeof view.action != 'undefined' && view.action == 'readDetail'){
                    title   = 'View';
                    is_view = true;
                }

                me.detailTool2.form().show('update', 800, title + ' Pricelist', 'FormKoefisienGrid');

                if(is_view){
                    me.getKoefisiengrid().down("#btnSave").hide();    
                }

                var fs = me.getKoefisiengrid().down("#harga_netto_grossup");

                if (parseInt(record[0].data.is_grossup) === 1) {
                    fs.show();
                    me.getKoefisiengrid().down("#action_field").setValue(view.action);
                }

                me.koefisienGrid.editingIndexRow = indexKoefisienGridSelect;

                record[0].data.harga_tanahpermeter          = accounting.formatMoney(toFloat(record[0].data.harga_tanahpermeter));
                record[0].data.harga_tanah_margin           = accounting.formatMoney(toFloat(record[0].data.harga_tanah_margin));
                record[0].data.harga_tanah_margin_persen    = accounting.formatMoney(toFloat(record[0].data.harga_tanah_margin_persen));
                record[0].data.harga_bangunan_margin        = accounting.formatMoney(toFloat(record[0].data.harga_bangunan_margin));
                record[0].data.harga_bangunan_margin_persen = accounting.formatMoney(toFloat(record[0].data.harga_bangunan_margin_persen));
                record[0].data.harga_bangunanpermeter       = accounting.formatMoney(toFloat(record[0].data.harga_bangunanpermeter));
                record[0].data.total_hargabangunan          = accounting.formatMoney(toFloat(record[0].data.total_hargabangunan));
                record[0].data.total_hargatanah             = accounting.formatMoney(toFloat(record[0].data.total_hargatanah));
                record[0].data.harga_netto                  = accounting.formatMoney(toFloat(record[0].data.harga_netto));
                record[0].data.harga_netto_grossup          = accounting.formatMoney(toFloat(record[0].data.harga_netto_grossup));
                record[0].data.harga_tanahdevcostpermeter   = accounting.formatMoney(toFloat(record[0].data.harga_tanahdevcostpermeter));
                record[0].data.harga_tanahmentahpermeter    = accounting.formatMoney(toFloat(record[0].data.harga_tanahmentahpermeter));
                record[0].data.harga_tanahhpp               = accounting.formatMoney(toFloat(record[0].data.harga_tanahhpp));
                record[0].data.harga_bangunanhpp            = accounting.formatMoney(toFloat(record[0].data.harga_bangunanhpp));
                record[0].data.total_tanah_hpp              = accounting.formatMoney(toFloat(record[0].data.total_tanah_hpp));
                record[0].data.total_bangunan_hpp           = accounting.formatMoney(toFloat(record[0].data.total_bangunan_hpp));
                record[0].data.total_hpptanahbangunan       = accounting.formatMoney(toFloat(record[0].data.total_hpptanahbangunan));
                record[0].data.total_margin                 = accounting.formatMoney(toFloat(record[0].data.total_margin));
                record[0].data.persentase_margin            = accounting.formatMoney(toFloat(record[0].data.persentase_margin));
                record[0].data.grossup_persen               = accounting.formatMoney(toFloat(record[0].data.grossup_persen));
                record[0].data.markup                       = accounting.formatMoney(toFloat(record[0].data.markup));
                record[0].data.margin_persen_tanah          = accounting.formatMoney(toFloat(record[0].data.margin_persen_tanah));
                record[0].data.margin_persen_bangunan       = accounting.formatMoney(toFloat(record[0].data.margin_persen_bangunan));
                record[0].data.total_harga_jual             = accounting.formatMoney(toFloat(record[0].data.total_harga_jual));
                record[0].data.spare                        = accounting.formatMoney(toFloat(record[0].data.spare));

                me.getKoefisiengrid().getForm().loadRecord(record[0]);
                me.unitSelectviaApli(record[0].data.unit_id);

                var selectedId = {};
                selectedId.id = record[0].data.list_koefisien_id;
                me.getKoefisiengridBeforeRender('eL', selectedId);
            }
        },
        delete: function (view, cell, row, col, e) {
            var me = this;
            var rows = me.getGriddetail().getSelectionModel().getSelection();
            var store = me.getGriddetail().getStore();
            if (rows.length > 1) {
                for (var i = 0; i < rows.length; i++) {
                    store.remove(rows[i]);
                }
            } else {
                store.remove(rows);
            }
        },
    },
    //==== Form Koefisien Grid Detail ==========
    getClusterByUnit: function (el) {
        var me = this;
        var kg = me.getKoefisiengriddetail();
        var storeClusterByUnit = me.getMasterpricelistClusterStore();
        var storeTypeByUnit = me.getMasterpricelistTypeStore();

        storeClusterByUnit.load({
            params: { mode_read: 'generateListCluster' }
        });

        storeTypeByUnit.load({
            params: { mode_read: 'generateListType' }
        });
    },
    clustergridSelectionChange: function (eL) {
        var me = this;
        var storetype = me.getMasterpricelistTypeStore();
        var f         = me.getKoefisienclustergrid();
        var formVal   = f.getForm().getValues();

        var opt = [];
        storetype.each(function (rec, idx) {
            if(rec.get('cluster_id') == formVal.cluster_id){
                opt.push(rec.data);
            }
        });

        if(opt.length == 0){
            Ext.Msg.show({
                title   : 'Failure',
                msg     : "Tidak ada data type pada 'Cluster " + f.down('[name=cluster_id]').rawValue + "'",
                icon    : Ext.Msg.ERROR,
                buttons : Ext.Msg.OK
            }); 
        }

        var newStore = Ext.create('Ext.data.Store', {
            fields : [f.down("[name=type_id]").valueField, f.down("[name=type_id]").displayField],
            data   : opt
        });
        f.down("[name=type_id]").bindStore(newStore);
        f.down("[name=type_id]").setValue('');
    },
    typegridSelectionChange: function (eL) {
        var me = this;
        var storetype = me.getMasterpricelistTypeStore();
        var f         = me.getKoefisienclustergrid();
        var formVal   = f.getForm().getValues();

        var bool         = false;
        var mandatoryTxt = '<sup style="color:rgb(255,0,0);font-size:0.8em;" class="x-required">*</sup>';
        storetype.each(function (rec, idx) {
            if(rec.get('type_id') == formVal.type_id){
                if(rec.get('productcategory_id') == 2){
                    bool         = true;
                    mandatoryTxt = '';
                }
            }
        });

        me.getKoefisienclustergrid().down('[name=harga_bangunanhpp]').allowBlank = bool;
        me.getKoefisienclustergrid().down('[name=harga_bangunanhpp]').labelEl.update('HPP'+mandatoryTxt);
        me.getKoefisienclustergrid().down('[name=harga_bangunanpermeter]').allowBlank = bool;
        me.getKoefisienclustergrid().down('[name=harga_bangunanpermeter]').labelEl.update('Harga Jual'+mandatoryTxt);
    },
    //====== from koefisien grid detail by cluster
    fdar: function () {
        var me = this;
        var x = {
            init: function () {
                /// init here
            },
            create: function () {
                /// create here
            },
            update: function () {
                var grid   = me.getGrid(),
                    store  = grid.getStore(),
                    record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));

                me.getFormdata().loadRecord(record);

                me.getFormdata().setLoading('Sedang memproses list Unit');

                $.ajax({
                    method : "POST",
                    url    : "erems/masterpricelist/read/",
                    data   : { mode_read: "pricelistdetail", pricelist_id: record.data.pricelist_id }
                }).done(function (msg) {
                    if (msg) {
                        var unit_detail = msg['data'];

                        for (var i = 0; i < unit_detail.length; i++) {
                            var gridDetail = me.getGriddetail(),
                                dStore     = gridDetail.getStore();

                            var val = {
                                pricelist_detail_id          : unit_detail[i].pricelistdetail_id,
                                pricelist_id                 : unit_detail[i].pricelist_id,
                                unit_id                      : unit_detail[i].unit_id,
                                cluster                      : unit_detail[i].cluster,
                                cluster_code                 : unit_detail[i].cluster_code,
                                unit_number                  : unit_detail[i].unit_number,
                                type_name                    : unit_detail[i].type_name,
                                land_size                    : unit_detail[i].land_size,
                                building_size                : unit_detail[i].building_size,
                                harga_tanahpermeter          : unit_detail[i].harga_tanahpermeter,
                                harga_bangunanpermeter       : unit_detail[i].harga_bangunanpermeter,
                                total_hargatanah             : unit_detail[i].total_hargatanah,
                                total_hargabangunan          : unit_detail[i].total_hargabangunan,
                                harga_netto                  : unit_detail[i].harga_netto,
                                is_grossup                   : unit_detail[i].is_grossup,
                                harga_netto_grossup          : unit_detail[i].harga_netto_grossup,
                                is_bphtb                     : unit_detail[i].is_bphtb,
                                is_ajb                       : unit_detail[i].is_ajb,
                                is_bbn                       : unit_detail[i].is_bbn,
                                list_koefisien_id            : unit_detail[i].list_koefisien_id,
                                harga_tanahdevcostpermeter   : unit_detail[i].harga_tanah_devcost,
                                harga_tanahmentahpermeter    : unit_detail[i].harga_tanah_mentah,
                                harga_tanahhpp               : unit_detail[i].harga_tanah_hpp,
                                harga_bangunanhpp            : unit_detail[i].harga_bangunan_hpp,
                                total_tanah_hpp              : unit_detail[i].total_tanah_hpp,
                                harga_tanah_margin           : unit_detail[i].harga_tanah_margin,
                                harga_tanah_margin_persen    : unit_detail[i].harga_tanah_margin_persen,
                                total_bangunan_hpp           : unit_detail[i].total_bangunan_hpp,
                                harga_bangunan_margin        : unit_detail[i].harga_bangunan_margin,
                                harga_bangunan_margin_persen : unit_detail[i].harga_bangunan_margin_persen,
                                total_hpptanahbangunan       : unit_detail[i].total_hpp,
                                total_margin                 : unit_detail[i].total_margin,
                                persentase_margin            : unit_detail[i].total_margin_persen,
                                keterangan_unit              : unit_detail[i].keterangan_unit,
                                grossup_persen               : unit_detail[i].grossup_persen,
                                markup                       : unit_detail[i].markup,
                                margin_persen_tanah          : unit_detail[i].margin_persen_tanah,
                                margin_persen_bangunan       : unit_detail[i].margin_persen_bangunan,
                                spare                        : unit_detail[i].spare,
                                total_harga_jual             : unit_detail[i].total_harga_jual,
                            };

                            var checkListKoefisienId = unit_detail[i].list_koefisien_id;
                            if (checkListKoefisienId && unit_detail[i].harga_final_gross && unit_detail[i].harga_final_netto) {
                                if (unit_detail[i].asuransi_nominal_persen === null) unit_detail[i].asuransi_nominal_persen = "";
                                if (unit_detail[i].bphtb_nominal_persen === null) unit_detail[i].bphtb_nominal_persen = "";
                                if (unit_detail[i].bbn_nominal_persen === null) unit_detail[i].bbn_nominal_persen = "";
                                if (unit_detail[i].ajb_nominal_persen === null) unit_detail[i].ajb_nominal_persen = "";
                                if (unit_detail[i].administrasi_nominal_persen === null) unit_detail[i].administrasi_nominal_persen = "";
                                if (unit_detail[i].admsubsidi_nominal_persen === null) unit_detail[i].admsubsidi_nominal_persen = "";
                                if (unit_detail[i].pmutu_nominal_persen === null) unit_detail[i].pmutu_nominal_persen = "";
                                if (unit_detail[i].paket_tambahan_nominal_persen === null) unit_detail[i].paket_tambahan_nominal_persen = "";

                                var selectedKoefisien_id                            = unit_detail[i].list_koefisien_id.split(",");
                                var selectedKoefisien_pricelist_name                = unit_detail[i].pricelist_name.split("|");
                                var selectedKoefisien_koefisien                     = unit_detail[i].koefisien_val.split("|");
                                var selectedKoefisien_biaya_asuransi                = unit_detail[i].biaya_asuransi.split("|");
                                var selectedKoefisien_biaya_bphtb                   = unit_detail[i].biaya_bphtb.split("|");
                                var selectedKoefisien_biaya_bbn                     = unit_detail[i].biaya_bbn.split("|");
                                var selectedKoefisien_biaya_ajb                     = unit_detail[i].biaya_ajb.split("|");
                                var selectedKoefisien_biaya_administrasi            = unit_detail[i].biaya_administrasi.split("|");
                                var selectedKoefisien_biaya_admsubsidi              = unit_detail[i].biaya_admsubsidi.split("|");
                                var selectedKoefisien_biaya_pmutu                   = unit_detail[i].biaya_pmutu.split("|");
                                var selectedKoefisien_biaya_paket_tambahan          = unit_detail[i].biaya_paket_tambahan.split("|");
                                var selectedKoefisien_asuransi_nominal_persen       = unit_detail[i].asuransi_nominal_persen.split("|");
                                var selectedKoefisien_bphtb_nominal_persen          = unit_detail[i].bphtb_nominal_persen.split("|");
                                var selectedKoefisien_bbn_nominal_persen            = unit_detail[i].bbn_nominal_persen.split("|");
                                var selectedKoefisien_ajb_nominal_persen            = unit_detail[i].ajb_nominal_persen.split("|");
                                var selectedKoefisien_administrasi_nominal_persen   = unit_detail[i].administrasi_nominal_persen.split("|");
                                var selectedKoefisien_admsubsidi_nominal_persen     = unit_detail[i].admsubsidi_nominal_persen.split("|");
                                var selectedKoefisien_pmutu_nominal_persen          = unit_detail[i].pmutu_nominal_persen.split("|");
                                var selectedKoefisien_paket_tambahan_nominal_persen = unit_detail[i].paket_tambahan_nominal_persen.split("|");
                                var selectedKoefisien_harga_final_gross             = unit_detail[i].harga_final_gross.split("|");
                                var selectedKoefisien_harga_final_netto             = unit_detail[i].harga_final_netto.split("|");

                                var data_koefisien                               = [],
                                    data_koefisien_id                            = [],
                                    data_koefisien_nama                          = [],
                                    data_koefisien_val                           = [],
                                    data_koefisien_biaya_asuransi                = [],
                                    data_koefisien_biaya_bphtb                   = [],
                                    data_koefisien_biaya_bbn                     = [],
                                    data_koefisien_biaya_ajb                     = [],
                                    data_koefisien_biaya_administrasi            = [],
                                    data_koefisien_asuransi_nominal_persen       = [],
                                    data_koefisien_bphtb_nominal_persen          = [],
                                    data_koefisien_bbn_nominal_persen            = [],
                                    data_koefisien_ajb_nominal_persen            = [],
                                    data_koefisien_administrasi_nominal_persen   = [],
                                    data_koefisien_admsubsidi_nominal_persen     = [],
                                    data_koefisien_pmutu_nominal_persen          = [],
                                    data_koefisien_paket_tambahan_nominal_persen = [],
                                    data_koefisien_biaya_admsubsidi              = [],
                                    data_koefisien_biaya_pmutu                   = [],
                                    data_koefisien_biaya_paket_tambahan          = [];

                                for (var j = 0; j < selectedKoefisien_id.length; j++) {
                                    data_koefisien.push(j);
                                    data_koefisien_id.push(selectedKoefisien_id[j]);
                                    data_koefisien_nama.push(selectedKoefisien_pricelist_name[j]);
                                    data_koefisien_val.push(selectedKoefisien_koefisien[j]);
                                    data_koefisien_biaya_asuransi.push(selectedKoefisien_biaya_asuransi[j]);
                                    data_koefisien_biaya_bphtb.push(selectedKoefisien_biaya_bphtb[j]);
                                    data_koefisien_biaya_bbn.push(selectedKoefisien_biaya_bbn[j]);
                                    data_koefisien_biaya_ajb.push(selectedKoefisien_biaya_ajb[j]);
                                    data_koefisien_biaya_administrasi.push(selectedKoefisien_biaya_administrasi[j]);
                                    data_koefisien_asuransi_nominal_persen.push(selectedKoefisien_asuransi_nominal_persen[j]);
                                    data_koefisien_bphtb_nominal_persen.push(selectedKoefisien_bphtb_nominal_persen[j]);
                                    data_koefisien_bbn_nominal_persen.push(selectedKoefisien_bbn_nominal_persen[j]);
                                    data_koefisien_ajb_nominal_persen.push(selectedKoefisien_ajb_nominal_persen[j]);
                                    data_koefisien_administrasi_nominal_persen.push(selectedKoefisien_administrasi_nominal_persen[j]);
                                    data_koefisien_admsubsidi_nominal_persen.push(selectedKoefisien_admsubsidi_nominal_persen[j]);
                                    data_koefisien_pmutu_nominal_persen.push(selectedKoefisien_pmutu_nominal_persen[j]);
                                    data_koefisien_paket_tambahan_nominal_persen.push(selectedKoefisien_paket_tambahan_nominal_persen[j]);
                                    data_koefisien_biaya_admsubsidi.push(selectedKoefisien_biaya_admsubsidi[j]);
                                    data_koefisien_biaya_pmutu.push(selectedKoefisien_biaya_pmutu[j]);
                                    data_koefisien_biaya_paket_tambahan.push(selectedKoefisien_biaya_paket_tambahan[j]);
                                }

                                me.generateGridDynamicly(gridDetail, dStore, val, data_koefisien, data_koefisien_id, data_koefisien_nama, data_koefisien_val, data_koefisien_biaya_ajb, data_koefisien_biaya_administrasi, data_koefisien_biaya_bbn, data_koefisien_biaya_bphtb, data_koefisien_biaya_asuransi, data_koefisien_asuransi_nominal_persen, data_koefisien_bphtb_nominal_persen, data_koefisien_bbn_nominal_persen, data_koefisien_ajb_nominal_persen, data_koefisien_administrasi_nominal_persen, data_koefisien_biaya_admsubsidi, data_koefisien_admsubsidi_nominal_persen, data_koefisien_biaya_pmutu, data_koefisien_pmutu_nominal_persen, data_koefisien_biaya_paket_tambahan, data_koefisien_paket_tambahan_nominal_persen, selectedKoefisien_harga_final_netto, selectedKoefisien_harga_final_gross);
                                gridDetail.getView().refresh();
                            }
                            dStore.add(val);
                        }
                    }

                    me.getFormdata().setLoading(false);
                });

                var state = me.getFormdata().up('window').state;
                if(state == 'read'){
                    if(typeof me.getFormdata() != 'undefined'){
                        me.getFormdata().down('#btnSave').hide();
                    }
                    if(typeof me.getGriddetail() != 'undefined'){
                        if(me.getGriddetail().down('#btnView') != null){
                            var itm = me.getGriddetail().down('[xtype=toolbar]').items.items;
                            for (var i = 0; i < itm.length; i++) {
                                if(itm[i].itemId != 'btnView'){
                                    itm[i].hide();
                                }
                            }
                        }
                        else{
                            me.getGriddetail().down('[xtype=toolbar]').hide();
                        }
                    }
                }
            }
        };
        return x;
    },
    gridSelectionChange: function () {
        var me   = this,
            grid = me.getGrid(), 
            row  = grid.getSelectionModel().getSelection(), store = grid.getStore(),
            record;

        for (var i = 0; i < row.length; i++) {
            if (typeof row[i] !== 'undefined') {
                record = store.getAt(store.indexOf(row[i]));
            }
        }

        grid.down('#btnEmail').setDisabled(true);
        grid.down('#btnDownload').setDisabled(true);
        grid.down('#btnView').setDisabled(true);
        grid.down('#btnEdit').setDisabled(true);
        grid.down('#btnDelete').setDisabled(true);
        grid.down('#btnCopy').setDisabled(true);

        if (typeof record !== 'undefined') {
            grid.down('#btnView').setDisabled(false);
            grid.down('#btnDownload').setDisabled(false);

            if (record.data.doc_status == 'OPEN') {
                grid.down('#btnEmail').setDisabled(false);

                if (record.data.is_sendmail == 0) {
                    grid.down('#btnEdit').setDisabled(false);
                    grid.down('#btnDelete').setDisabled(false);
                }
            }

            if (record.data.rejectby > 0) {
                grid.down('#btnCopy').setDisabled(false);
            }
        }
    },
    gridItemDblClick: function (el) {
        var me = this,
            btnEdit = el.up('panel').down('#btnEdit'),
            state = (btnEdit.isVisible() && !btnEdit.isDisabled() ? btnEdit.bindAction : 'show');

        var grid = me.getGrid(), row = grid.getSelectionModel().getSelection(), store = grid.getStore();
        var record = store.getAt(store.indexOf(row[0]));

        if (row[0]) {
            if (record.data.doc_status == 'OPEN') {
                me.execAction(el, state);
            }
        }
    },
    gridActionColumnClick: function (view, cell, row, col, e) {
        var me = this;
        var record = me.getGrid().getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        me.getGrid().getSelectionModel().deselect(row, true);
        me.getGrid().getSelectionModel().select(row, true);

        if (m) {
            switch (m[1]) {
                case 'excelcreate':
                    if (!btnStatus) {
                        me.generateExcelByPricelistID();
                        break;
                    } else {
                        break;
                    }
                case 'emailsend':
                    if (!btnStatus) {
                        me.sentEmailByPricelistID();
                        break;
                    } else {
                        break;
                    }
                case 'update':
                    me.formDataShow('update');
                    break;
                case 'destroy':
                    me.dataDestroy();
                    break;
            }
        }
    },
    dataDestroy: function () {
        var me = this;
        var rows = me.getGrid().getSelectionModel().getSelection();
        if (rows.length < 1) {
            Ext.Msg.alert('Info', 'No record selected !');
            return;
        } else {
            var confirmmsg, successmsg, failmsg;
            var recordcounttext = rows.length + ' record' + (rows.length > 1 ? 's' : '');
            var store = me.getGrid().getStore();
            if (rows.length == 1) {
                var selectedRecord = '[' + store.getAt(store.indexOf(rows[0])).get('keterangan') + ']';
                confirmmsg = 'Delete ' + selectedRecord + ' ?';
                failmsg    = 'Error: Unable to delete ' + selectedRecord + '.';
            } else {
                confirmmsg = 'This action will delete ' + recordcounttext + '.<br />Continue ?';
                failmsg    = 'Error: Unable to delete data.';
            }
            Ext.Msg.confirm('Delete Data', confirmmsg, function (btn) {
                if (btn == 'yes') {
                    resetTimer();
                    var msg = function () {
                        me.getGrid().up('window').mask('Deleting data, please wait ...');
                    };
                    for (var i = 0; i < rows.length; i++) {

                        store.remove(rows[i]);
                    }

                    store.on('beforesync', msg);
                    store.sync({
                        success: function (s) {
                            me.getGrid().up('window').unmask();
                            var successcount = parseInt(Ext.decode(s.operations[0].response.responseText).total, 10);
                            var successmsg = (rows.length == 1 ? selectedRecord : (successcount != rows.length ? successcount + ' of ' : '') + recordcounttext) + ' deleted successfully.';
                            store.un('beforesync', msg);
                            store.reload();
                            if (typeof Ext.StoreManager.lookup(me.stores[0]) != 'undefined') {
                                Ext.StoreManager.lookup(me.stores[0]).load({ params: { limit: 0 } });
                            }
                            Ext.Msg.show({
                                title   : 'Success',
                                msg     : successmsg,
                                icon    : Ext.Msg.INFO,
                                buttons : Ext.Msg.OK
                            });
                        },
                        failure: function () {
                            me.getGrid().up('window').unmask();
                            store.un('beforesync', msg);
                            store.reload();
                            Ext.Msg.show({
                                title   : 'Failure',
                                msg     : failmsg + ' The data may have been used.',
                                icon    : Ext.Msg.ERROR,
                                buttons : Ext.Msg.OK
                            });
                        }
                    });
                }
            });
        }
    },
    getActiveForm: function () {
        return this.activeForm;
    },
    formDataBeforeRender: function (el) {
        var me = this;
        var dStore = me.getGriddetail().getStore();
        dStore.loadData([], false);
    },
    formDataAfterRender: function (el) {
        var me = this;

        me.detailTool2 = new Erems.library.DetailtoolAll();
        me.detailTool2.setConfig({
            viewPanel        : 'KoefisienGrid',
            parentFDWindowId : me.getFormdata().up('window').id,
            controllerName   : me.controllerName
        });
        
        me.detailTool1 = new Erems.library.DetailtoolAll();
        me.detailTool1.setConfig({
            viewPanel        : 'KoefisienClusterGrid',
            parentFDWindowId : me.getFormdata().up('window').id,
            controllerName   : me.controllerName
        });

        me.storeProcess = me.createSpProcessObj(me.storeProcess);
        var state = el.up('window').state;

        if (state == 'create') {
            me.fdar().create();
        } else if (state == 'update' || state == 'read') {
            me.fdar().update();
        }
    },
    // ============== simpan data dengan ekstrator sendiri ==============
    dataSave: function () {
        var me = this;

        var form = me.getFormdata().getForm();
        if (form.isValid()) {
            var store = me.getGriddetail().getStore();

            var cKoef = store.getCount();
            store.each(function (record, idx) {
                if(record.get('list_koefisien_id') == ''){
                    cKoef--;
                }
            });

            if(store.getCount() != cKoef){
                me.tools.alert.warning("Ada data yang belum di pilih koefisiennya.");
                return false;
            }
            else{
                if (store.getCount() == 0) {
                    Ext.Msg.confirm('Update Data', 'Simpan Data tanpa Detail Pricelist ?', function (btn) {
                        if (btn == 'yes') {
                            me.dataSaveConfirm(store);
                        }
                    });
                }
                else {
                    Ext.Msg.confirm('Update Data', 'Simpan Data Pricelist ?', function (btn) {
                        if (btn == 'yes') {
                            me.dataSaveConfirm(store);
                        }
                    });
                }
            }
        }
    },
    dataSaveConfirm: function (store) {
        var me = this;
        var data = [];
        store.each(function (record, idx) {
            data.push(record.data);
        });

        var fields = me.getFormdata().getValues();

        var myObj = {
            keterangan         : fields.keterangan,
            nomor_im           : fields.nomor_im,
            pricelist_date     : fields.pricelist_date,
            pricelist_end_date : fields.pricelist_end_date, // added by rico 08022023
            pricelist_id       : fields.pricelist_id,
            detail_pricelist   : data
        }

        resetTimer();

        me.getFormdata().up('window').body.mask('Saving, please wait ...');

        Ext.Ajax.timeout = 60000 * 30;
        Ext.Ajax.request({
            url: 'erems/masterpricelist/create',
            params: {
                data: Ext.encode(myObj)
            },
            success: function (response) {
                me.getFormdata().up('window').body.unmask();
                if (Ext.decode(response.responseText).success == true) {
                    Ext.Msg.show({
                        title   : 'Success',
                        msg     : 'Data saved successfully.',
                        icon    : Ext.Msg.INFO,
                        buttons : Ext.Msg.OK,
                        fn: function () {
                            me.getFormdata().up('window').close();
                            var gridDepan = me.getGrid();
                            var storeDepan = gridDepan.getStore();
                            storeDepan.reload();
                        }
                    });
                }
                else if (Ext.decode(response.responseText).success == 'email_failed') {
                    Ext.Msg.show({
                        title   : 'Information',
                        msg     : 'Data saved successfully but sending email notifications failed.',
                        icon    : Ext.Msg.INFO,
                        buttons : Ext.Msg.OK,
                        fn: function () {
                            me.getFormdata().up('window').close();
                            var gridDepan = me.getGrid();
                            var storeDepan = gridDepan.getStore();
                            storeDepan.reload();
                        }
                    });
                }
                else {
                    Ext.Msg.show({
                        title   : 'Failure',
                        msg     : 'Error: Unable to save data.',
                        icon    : Ext.Msg.ERROR,
                        buttons : Ext.Msg.OK
                    });
                }
            },
        });
    },
    // =========================== generate excel By Pricelist ID ==================================
    generateExcelByPricelistID: function () {
        var me     = this,
            record = me.getGrid().getSelectedRecord();

        if(typeof record != 'undefined'){
            me.getGrid().setLoading('Sedang memproses file');
            $.ajax({
                method : "POST",
                url    : "erems/masterpricelist/read/",
                data   : { mode_read: "generateExcel", pricelist_id: record.data.pricelist_id }
            }).done(function (msg) {
                me.getGrid().setLoading(false);
                if(msg.success){
                    var imgWin = new Ext.Window({
                        width      : 250,
                        height     : 50,
                        id         : 'theImgWin',
                        autoScroll : true,
                        title      : record.data.keterangan,
                        resizable  : false,
                        modal      : true,
                        items      : [
                            {
                                xtype  : 'label',
                                html   : '<a href="' + msg.url + '" target="blank">Click Here For Download Document</a>',
                                flex   : 1,
                                margin : '0 0 0 10px'
                            },
                        ]
                    });
                    imgWin.show();
                }
                else{
                    Ext.Msg.show({
                        title   : 'Failure',
                        msg     : 'Error: Unable to download data.',
                        icon    : Ext.Msg.ERROR,
                        buttons : Ext.Msg.OK
                    });
                }
            });
        }

    },
    // =========================== send email excel By Pricelist ID ==================================
    sentEmailByPricelistID: function () {
        var me     = this,
            grid   = me.getGrid(),
            store  = grid.getStore(),
            record = grid.getSelectedRecord();

        if(typeof record != 'undefined'){
            me.getGrid().setLoading('Sedang mengirim email ..');
            $.ajax({
                method : "POST",
                url    : "erems/masterpricelist/read/",
                data   : { mode_read: "sendEmail", pricelist_id: record.data.pricelist_id }
            }).done(function (msg) {
                me.getGrid().setLoading(false);
                if (msg.success) {
                    Ext.Msg.show({
                        title   : 'Success',
                        msg     : 'Email send successfully to ' + msg.emailAddress,
                        icon    : Ext.Msg.INFO,
                        buttons : Ext.Msg.OK,
                        fn      : function () {
                            store.reload();
                        }
                    });
                } else {
                    Ext.Msg.show({
                        title   : 'Failure',
                        msg     : 'Error: Unable to send email.',
                        icon    : Ext.Msg.ERROR,
                        buttons : Ext.Msg.OK
                    });
                }
            });
        }
    },
    // ================================ function add colomun dynamiclly
    generateGridDynamicly: function (gridDetail, dStore, val, data_koefisien, data_koefisien_id, data_koefisien_nama, data_koefisien_val, data_koefisien_biaya_ajb, data_koefisien_biaya_administrasi, data_koefisien_biaya_bbn, data_koefisien_biaya_bphtb, data_koefisien_biaya_asuransi, data_koefisien_asuransi_nominal_persen, data_koefisien_bphtb_nominal_persen, data_koefisien_bbn_nominal_persen, data_koefisien_ajb_nominal_persen, data_koefisien_administrasi_nominal_persen, data_koefisien_biaya_admsubsidi, data_koefisien_admsubsidi_nominal_persen, data_koefisien_biaya_pmutu, data_koefisien_pmutu_nominal_persen, data_koefisien_biaya_paket_tambahan, data_koefisien_paket_tambahan_nominal_persen, selectedKoefisien_harga_final_netto = '', selectedKoefisien_harga_final_gross = '') {
        var me = this;
        for (var k = 0; k < data_koefisien.length; k++) {
            var gridDynamicNetto = gridDetail.getView().getHeaderCt().child('#colms_koefisien_netto_' + data_koefisien_id[k]);
            var gridDynamicGross = gridDetail.getView().getHeaderCt().child('#colms_koefisien_gross_' + data_koefisien_id[k]);
            if (!gridDynamicNetto && !gridDynamicGross) {
                var dynamicColumnNetto = Ext.create('Ext.grid.column.Number',
                    {
                        align     : 'right',
                        text      : data_koefisien_nama[k] + '(Netto)',
                        dataIndex : 'KoefisienId_netto_' + data_koefisien_id[k],
                        itemId    : 'colms_koefisien_netto_' + data_koefisien_id[k],
                        width     : 150
                    }
                );

                var dynamicColumnGross = Ext.create('Ext.grid.column.Number',
                    {
                        align     : 'right',
                        text      : data_koefisien_nama[k] + '(Gross)',
                        dataIndex : 'KoefisienId_gross_' + data_koefisien_id[k],
                        itemId    : 'colms_koefisien_gross_' + data_koefisien_id[k],
                        width     : 150
                    }
                );
                gridDetail.headerCt.insert(gridDetail.columns.length, dynamicColumnNetto);
                gridDetail.headerCt.insert(gridDetail.columns.length, dynamicColumnGross);

                var fields = [];
                var store_old = dStore.model.getFields();
                for (var j = 0; j < store_old.length; j++) {
                    fields.push({ name: store_old[j].name, type: store_old[j].type.type });
                }
                fields.push({ name: 'KoefisienId_netto_' + data_koefisien_id[k], type: 'desimal' });
                fields.push({ name: 'KoefisienId_gross_' + data_koefisien_id[k], type: 'desimal' });
                dStore.model.setFields(fields);
            }

            if (selectedKoefisien_harga_final_netto != '' && selectedKoefisien_harga_final_gross != '') {
                val['KoefisienId_netto_' + data_koefisien_id[k]] = selectedKoefisien_harga_final_netto[k];
                val['KoefisienId_gross_' + data_koefisien_id[k]] = selectedKoefisien_harga_final_gross[k];
            } 
            else {
                var harga_netto = parseFloat(val['is_grossup'] === 1 ? val['harga_netto_grossup'] : val['harga_netto']);
                if (harga_netto === undefined) harga_netto = 1;

                var koefisienNetto = parseFloat(data_koefisien_val[k]) * harga_netto;

                var biaya_asuransi = parseFloat(data_koefisien_biaya_asuransi[k]);
                if (data_koefisien_asuransi_nominal_persen[k] === "2") {
                    biaya_asuransi = (biaya_asuransi / 100) * koefisienNetto;
                }

                var biaya_bphtb = parseFloat(data_koefisien_biaya_bphtb[k]);
                if (data_koefisien_bphtb_nominal_persen[k] === "2") {
                    var CustomBPTHB = koefisienNetto - parseFloat(me.NOPTKP);
                    biaya_bphtb = CustomBPTHB * (biaya_bphtb / 100);
                }

                var biaya_bbn = parseFloat(data_koefisien_biaya_bbn[k]);
                if (data_koefisien_bbn_nominal_persen[k] === "2") {
                    biaya_bbn = (biaya_bbn / 100) * koefisienNetto;
                }

                var biaya_ajb = parseFloat(data_koefisien_biaya_ajb[k]);
                if (data_koefisien_ajb_nominal_persen[k] === "2") {
                    biaya_ajb = (biaya_ajb / 100) * koefisienNetto;
                }

                var biaya_administrasi = parseFloat(data_koefisien_biaya_administrasi[k]);
                if (data_koefisien_administrasi_nominal_persen[k] === "2") {
                    biaya_administrasi = (biaya_administrasi / 100) * koefisienNetto;
                }

                var biaya_admsubsidi = parseFloat(data_koefisien_biaya_admsubsidi[k]);
                if (data_koefisien_admsubsidi_nominal_persen[k] === "2") {
                    biaya_admsubsidi = (biaya_admsubsidi / 100) * koefisienNetto;
                }

                var biaya_pmutu = parseFloat(data_koefisien_biaya_pmutu[k]);
                if (data_koefisien_pmutu_nominal_persen[k] === "2") {
                    biaya_pmutu = (biaya_pmutu / 100) * koefisienNetto;
                }

                var biaya_paket_tambahan = parseFloat(data_koefisien_biaya_paket_tambahan[k]);
                if (data_koefisien_paket_tambahan_nominal_persen[k] === "2") {
                    biaya_paket_tambahan = (biaya_paket_tambahan / 100) * koefisienNetto;
                }

                var koefisienGross = koefisienNetto + parseFloat(biaya_bbn) + parseFloat(biaya_ajb) + parseFloat(biaya_administrasi) + parseFloat(biaya_bphtb) + parseFloat(biaya_asuransi) + parseFloat(biaya_admsubsidi) + parseFloat(biaya_pmutu) + parseFloat(biaya_paket_tambahan);
                if (me.isUsePPN) {
                    koefisienGross = koefisienGross + ((parseFloat(me.ppn_value)/100) * koefisienNetto);
                }

                if (me.pembulatan1000) {
                    koefisienNetto = Math.round(koefisienNetto / 1000) * 1000;
                    koefisienGross = Math.round(koefisienGross / 1000) * 1000;
                }
                else {
                    koefisienNetto = me.tools.floatval(koefisienNetto).toFixed(0);
                    koefisienGross = me.tools.floatval(koefisienGross).toFixed(0);
                }

                val['KoefisienId_netto_' + data_koefisien_id[k]] = koefisienNetto;
                val['KoefisienId_gross_' + data_koefisien_id[k]] = koefisienGross;
            }
        }
        gridDetail.getView().refresh();
    },
    grossUpSelected: function (el) {
        var me = this;
        if(me.getKoefisiengrid().down("#action_field").getValue() != 'update'){
            me.calculateUnitTotal();
        }
        else{
            me.getKoefisiengrid().down("#action_field").setValue('');
        }
    },
    genBiayaSurat: function (biayaSurat, val) {
        var me = this;
        var bphtb = window[me.mkProlibFile].getBiayaBPHTB({
            hrgNetto: accounting.unformat(me.getKoefisiengrid().down('[name=harga_netto_grossup]').getValue()),
            landSize: me.getKoefisiengrid().down("[name=unit_land_size]").getValue()
        });
        var bbn = window[me.mkProlibFile].getBiayaBBNSertifikat({
            hrgNetto: accounting.unformat(me.getKoefisiengrid().down('[name=harga_netto_grossup]').getValue()),
            landSize: me.getKoefisiengrid().down("[name=unit_land_size]").getValue()
        });

        var ajb = window[me.mkProlibFile].getBiayaBAJB({
            hrgNetto: accounting.unformat(me.getKoefisiengrid().down('[name=harga_netto_grossup]').getValue()),
            landSize: me.getKoefisiengrid().down("[name=unit_land_size]").getValue()
        });
        var storeKoefisiengriddetail = me.getMasterpricelistkoefisiengriddetailStore();
        var detailList = [];
        for (var i = 0; i < storeKoefisiengriddetail.getCount(); i++) {
            storeKoefisiengriddetail.each(function (record, idx) {
                if (i == idx) {
                    if (biayaSurat == 'bphtb') {
                        record.data.biaya_bphtb = (val == 0 ? 0 : (bphtb < 0 ? 0 : bphtb));
                    } else if (biayaSurat == 'bbn') {
                        record.data.biaya_bbn = (val == 0 ? 0 : (bbn < 0 ? 0 : bbn));
                    } else if (biayaSurat == 'ajb') {
                        record.data.biaya_ajb = (val == 0 ? 0 : (ajb < 0 ? 0 : ajb));
                    }
                    detailList[i] = record.data;
                }
            });
        }
        storeKoefisiengriddetail.loadData(detailList);
    },
    copyData: function () {
        var me = this;
        var rec = me.getGrid().getSelectedRecord();

        $.ajax({
            method : "POST",
            url    : "erems/masterpricelist/read/",
            data   : { mode_read: "copyData", pricelist_id: rec.data.pricelist_id }
        }).done(function (msg) {
            if (msg > 0) {
                Ext.Msg.show({
                    title   : 'Information',
                    msg     : 'Data copy successfully.',
                    icon    : Ext.Msg.INFO,
                    buttons : Ext.Msg.OK,
                    fn      : function () {
                        var gridDepan = me.getGrid();
                        var storeDepan = gridDepan.getStore();
                        storeDepan.reload();
                    }
                });
            }
            else {
                Ext.Msg.show({
                    title   : 'Failure',
                    msg     : 'Error: Unable to copy data.',
                    icon    : Ext.Msg.ERROR,
                    buttons : Ext.Msg.OK
                });
            }
        });
    }
});