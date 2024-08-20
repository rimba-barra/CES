Ext.define('Cashier.controller.Journalsalesbooking', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Journalsalesbooking',
    requires: [
        'Cashier.template.ComboBoxFields',
        'Cashier.library.template.combobox.Ptusercombobox',
        'Cashier.library.template.combobox.Clustercombobox'
    ],
    views: [
        'journalsalesbooking.Panel',
        'journalsalesbooking.Grid',
        'journalsalesbooking.FormSearch',
        'journalsalesbooking.FormData',
    ],
    stores: [
        'Journalsalesbooking',
        'Journalsalesbookingnew',
        'Cluster',
        'Pt',
        'Ptbyuser'
    ],
    models: [
        'Journalsalesbooking',
        'Cluster',
        'Pt'
    ],
    refs: [
        {ref: 'grid', selector: 'journalsalesbookinggrid'},
        {ref: 'gridnew', selector: 'journalsalesbookinggridnew'},
        {ref: 'formsearch', selector: 'journalsalesbookingformsearch'},
        {ref: 'formdata', selector: 'journalsalesbookingformdata'},
    ],
    controllerName: 'journalsalesbooking',
    fieldName: 'journalsalesbooking',
    bindPrefixName: 'Journalsalesbooking',
    rowproject: null, storept: null, state: null,
    senddata: null,
    urlrequest: 'cashier/journalsalesbooking/create',
    loadingrequest: new Ext.LoadMask(Ext.getBody(), {msg: "Please wait..."}),
    pt_id: apps.pt,
    project_id: apps.project,
    gridId: null,
    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Cashier.library.box.Config({
            _controllerName: me.controllerName
        });
    }, 
    init: function (application) {
        var me = this;
        var events = new Cashier.library.box.tools.EventSelector();
        //this.control(events.getEvents(me, me.controllerName));
        me.tools = new Cashier.library.box.tools.Tools({config: me.myConfig});

        this.control({
            'journalsalesbookingpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'journalsalesbookingpanel gridcolumn ': {
                headerclick: function (en) {
                    //console.log(en);
                    var ab = en.ownerCt.itemId;

                    if (ab === 'journalsalesbookinggridnewId') {
                        if (me.gridId === 1) {
                            var store = Ext.data.StoreManager.lookup('Journalsalesbookingnew');
                        } else {
                            var store = Ext.data.StoreManager.lookup('Journalsalesbooking');
                        }
                        store.removeAll();

                    }
                }
            },
            'journalsalesbookingpanel [name=panel]': {
                tabchange: function (tabPanel, tab) {
                    if (tab.xtype === 'journalsalesbookinggridnew') {
                        me.setDefaultValuesGridnew();
                        var store = Ext.data.StoreManager.lookup('Journalsalesbookingnew');
                        store.removeAll();
                        store.reload();
                        me.gridId = 1;
                    }
                    else {
                        me.gridId = 0;
                    }
                }

            },
            'journalsalesbookinggrid,journalsalesbookinggridnew': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClickRev,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange,
                select: this.gridSelected,

            },

            'journalsalesbookinggrid toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'journalsalesbookinggridnew toolbar button[action=create]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'journalsalesbookinggrid toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'journalsalesbookinggridnew toolbar button[action=update]': {
                click: function () {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'journalsalesbookinggrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'journalsalesbookinggridnew toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'journalsalesbookinggrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'journalsalesbookinggridnew toolbar button[action=print]': {
                click: this.dataPrint
            },
            'journalsalesbookinggrid toolbar button[action=generate]': {
                click: function (view, cell, row, col, e) {
                    this.selectiongrid();
                }
            },
            'journalsalesbookinggrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGrid();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'journalsalesbookinggridnew actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                //click: this.gridActionColumnClick
                click: function (view, cell, row, col, e) {
                    var me, grid;
                    me = this;
                    grid = me.getGridnew();
                    me.gridActionColumnClick(view, cell, row, col, e, grid);
                }
            },
            'journalsalesbookingformsearch': {
                afterrender: function () {
                    me = this;
                    me.setStorePtuser();
                    me.setDefaultValues();

                },
            },
            'journalsalesbookingformsearch [name=pt_id]': {
                 'select': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    form = me.getFormsearch();
                    rowdata = form.down('[name=pt_id]').valueModels[0]['raw'];
                    if (form) {
                        me.project_id = rowdata.project_id;
                        me.pt_id = rowdata.pt_id;
                        form.down('[name=project_id]').setValue(rowdata.project_id);
                    }
                    me.setStoreCluster();
                },
                'change': function (that, newValue, oldValue, eOpts) {
                    var me, form, rowdata;
                    me = this;
                    me.setStoreCluster();
                }
            },
            'journalsalesbookingformsearch button[action=search]': {
                click: this.dataSearch
            },
            'journalsalesbookingformsearch button[action=reset]': {
                click: this.dataReset
            },
            //====================================END SUB DETAIL===============================================      

        });
    },
    panelAfterRender: function () {
        var me = this;
        $("#WINDOW-mnu"+me.bindPrefixName+"-body .x-tool-collapse-left").click();
        $("#WINDOW-mnu"+me.bindPrefixName+"_header-targetEl .x-tool-maximize").click();

    },
    selectiongrid: function(){
        var me = this;
        var grid = me.getGrid();
        var storeus = grid.getStore();
        var rows = grid.getSelectionModel().getSelection();
        var rec = grid.getSelectedRecord();

        var units = '';
        var booking_dates = '';

        if (rows.length < 1) {
            alert("Pilih Terlebih dahulu");
            return 0;
        } else {
            var unit_numbers = '';
            var yearinit = rows[0];
            var yearinit = yearinit.get('booking_date');
            if(yearinit!==null){
                var yearinit = yearinit.getFullYear();
            }
            

            for (var i = rows.length-1; i >= 0; i--) {
                record = rows[i];
                unit_numbers =  record.get('unit_number') + ', ' + unit_numbers ;
                units = record.get('unit_id')+'~'+units;
                var booking_date = me.formatDate(record.get('booking_date'));
                if(record.get('booking_date') == null){
                    Ext.Msg.alert('Error', 'Booking Date is empty : '+record.get('unit_number'));
                    return 0;
                }

                if(yearinit!==record.get('booking_date').getFullYear()){
                    Ext.Msg.alert('Error', 'Booking date should be in the same Year');
                    return 0;
                }
                booking_dates = booking_date+'~'+booking_dates;
            }

            unit_numbers = unit_numbers.replace(/,\s*$/, "");
        }

        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun",
          "jul", "aug", "sep", "oct", "nov", "dec"
        ];

        //validating closing
        me.urlrequest = 'cashier/masterclosing/read';

        me.loadingrequest.show();

        Ext.Ajax.request({
                url: me.urlrequest,
                timeout: 45000000,
                method: 'POST',
                params: {
                    pt_id: me.pt_id,
                    project_id: me.project_id,
                    year: yearinit,
                    module: 'masterclosing',
                    mode_read: 'getclosing' 
                },
                success: function (response) {

                        try {
                            me.info = Ext.JSON.decode(response.responseText);
                            var data = me.info.data.hasil[0];
                            for (var i = rows.length-1; i >= 0; i--) {
                                record = rows[i];
                                const dt = record.get('booking_date');
                                const  monthname = monthNames[dt.getMonth()];
                                if(data[monthname]==1){
                                    Ext.Msg.alert('Error', 'Month : <b>' +monthname +' ' + yearinit +'</b> is Closed For Transaction');
                                    me.loadingrequest.hide();
                                    return 0;
                                }
                            }

                            Ext.Msg.confirm('Book these units?', unit_numbers, function (btn) {
                                if (btn == 'yes') {
                                    me.urlrequest= 'cashier/journalsalesbooking/create';
                                    me.senddata = {
                                        pt_id: me.pt_id,
                                        project_id: me.project_id,
                                        hideparam: 'proccessbooking',
                                        units: units, 
                                        booking_dates: booking_dates
                                    };
                                    me.AjaxRequest();
                                }

                            });

                            me.loadingrequest.hide();
                        }
                        catch(err) {
                            Ext.Msg.alert('Error', 'Request Failed.');
                            me.loadingrequest.hide();
                        }


                    

                },
                failure: function (response) {
                    Ext.Msg.alert('Error', 'Request Failed.');
                    me.loadingrequest.hide();
                }
            });



    },
    AjaxRequest: function () {
        var me;
        me = this;
 
        if (true) {
                me.loadingrequest.show();
                Ext.Ajax.request({
                    url: me.urlrequest,
                    timeout: 45000000,
                    method: 'POST',
                    params: {
                        data: Ext.encode(me.senddata)
                    },
                    success: function (response) {

                        if(response.responseText.includes("Belum ada")){
                            Ext.Msg.alert('Error', response.responseText);
                            me.loadingrequest.hide();
                            return false;
                        }

                        try {
                            me.info = Ext.JSON.decode(response.responseText);
                            me.getGrid().getStore().reload();
                            me.loadingrequest.hide();
                        }
                        catch(err) {
                            Ext.Msg.alert('Error', 'Request Failed.');
                            me.loadingrequest.hide();
                        }


                    },
                    failure: function (response) {
                        Ext.Msg.alert('Error', 'Request Failed.');
                        me.loadingrequest.hide();
                    }
                });
        }
    },
    setStoreGrid: function () {
        var me, store, form;
        me = this;
        store = me.getStore("Journalsalesbooking");
        store.reload({
            params: {
                "default": 'getptbyuser',
                "statusrequest": 'unbooked_only',
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {

            }
        });
    },
    setStoreCluster: function () {
        var me, store, form;
        me = this;
        
        form = me.getFormsearch();
        store = me.getStore("Cluster");              
        store.reload({
            params: {
                "project_id": me.project_id,
                "pt_id": me.pt_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                rowdata = records[0]['data'];
                form.down('[name=cluster_id]').setValue(parseInt(rowdata.cluster_id));

            }
        });
    },
    setStorePtuser: function () {
        var me, store, form;
        me = this;
        form = me.getFormsearch();
        store = me.getStore("Ptbyuser");
        store.reload({
            params: {
                "hideparam": 'getptbyuser',
                "project_id": me.project_id,
                "start": 0,
                "limit": 1000,
            },
            callback: function (records, operation, success) {
                form.down('[name=pt_id]').setValue(parseInt(me.pt_id));
            }
        });
    },
    setDefaultValues: function(){
        var me = this;
        form = me.getFormsearch();
       
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var firstDay1 = new Date(date.getFullYear()-3, 0, 1);

        setTimeout(function(){ 
            form.down('[name=pt_id]').setValue(parseInt(me.pt_id));
            form.down('[name=sales_fromdate]').setValue(firstDay1);
            form.down('[name=sales_untildate]').setValue(lastDay);
            form.down('[name=handover_fromdate]').setValue(firstDay1);
            form.down('[name=handover_untildate]').setValue(lastDay);
            me.setStoreCluster();
            //me.dataSearch();
        },500);

    },
    setDefaultValuesGridnew: function(){
        var me = this;
        form = me.getFormsearch();
       
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var firstDay1 = new Date(date.getFullYear()-3, 0, 1);

        form.down('[name=pt_id]').setValue(parseInt(me.pt_id));
        form.down('[name=sales_fromdate]').setValue(firstDay1);
        form.down('[name=sales_untildate]').setValue(lastDay);
        form.down('[name=handover_fromdate]').setValue(firstDay1);
        form.down('[name=handover_untildate]').setValue(lastDay);

    },
    dataSearch: function () {
        resetTimer();
        var me = this;
        var form = me.getFormsearch().getForm();

        if(me.gridId===1){
            var store = me.getGridnew().getStore();
        }else{
            var store = me.getGrid().getStore();
        }
        

        me.getFormsearch().down("[name=hideparam]").setValue('default');  // added on april 2016, ahmad riadi    
        var fields = me.getFormsearch().getValues();
        for (var x in fields)
        {
            store.getProxy().setExtraParam(x, fields[x]);
        }
        me.loadPage(store);
    },
});