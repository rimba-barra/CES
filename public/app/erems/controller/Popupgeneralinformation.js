Ext.define('Erems.controller.Popupgeneralinformation', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Popupgeneralinformation',
    views: ['popupgeneralinformation.Panel', 'popupgeneralinformation.Grid', 'popupgeneralinformation.FormSearch', 'popupgeneralinformation.FormData'],
    requires: ['Erems.library.XyReport',
        'Erems.library.box.Config', 'Erems.library.box.tools.Tools', 'Erems.template.ComboBoxFields', 'Erems.library.box.tools.EventSelector'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupgeneralinformationgrid'
        },
        {
            ref: 'formsearch',
            selector: 'popupgeneralinformationformsearch'
        },
        {
            ref: 'formdata',
            selector: 'popupgeneralinformationformdata'
        },
        {
            ref: 'gridpayment',
            selector: 'popupgeneralinformationgridpayment'
        },
        {
            ref: 'panel',
            selector: 'popupgeneralinformationpanel'
        },
        {
            ref: 'gridutility',
            selector: 'popupgeneralinformationgridutility'
        }
    ],
    controllerName: 'popupgeneralinformation',
    fieldName: 'expense_no',
    bindPrefixName: 'Popupgeneralinformation',
    formWidth: 800,
    nomMaster: 'list_popupgeneralinformation',
    localStore: {
        detail: null
    },
    xyReport: null,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    iwField: {
        title: 'Popup General Information'
    },
    formxWinId: 'win-popupgeneralinformationwinId',
    reportFileName:null,
    SH1GITPL:null,
    constructor: function(configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    init: function(application) {
        var me = this;
        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        this.control({
            'popupgeneralinformationpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupgeneralinformationgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupgeneralinformationgrid toolbar button[action=view]': {
                click: function() {
                    //   this.formDataShow('view');
                    me.showViewForm();
                }
            },
            'popupgeneralinformationgrid toolbar button[action=kartupiutang]': {
                click: function() {
                    me.showKartuPiutang();
                }
            },
            'popupgeneralinformationgrid toolbar button[action=excel]': {
                click: function() {
                    me.showExcel();
                }
            },
            'popupgeneralinformationgrid toolbar button[action=update]': {
                click: function() {
                    this.formDataShow('update');
                }
            },
            'popupgeneralinformationgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'popupgeneralinformationgrid toolbar button[action=print]': {
                click: this.mainPrint
            },
            'popupgeneralinformationgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'popupgeneralinformationformsearch': {
                afterrender: this.formSearchAfterRender
            },
            'popupgeneralinformationformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupgeneralinformationformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupgeneralinformationformdata': {
                afterrender: this.formDataAfterRender
            },
            'popupgeneralinformationformdata button[action=save]': {
                click: this.dataSave
            },
            'popupgeneralinformationformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'popupgeneralinformationformdata button[action=kartupiutang]': {
                click: function(){
                     me.showKartuPiutang();
                }
            }
        });
    },
    showExcel:function(){
       
        var me = this;
        var p = me.getPanel();
        var params = me.getFormsearch().getValues();
        var fields = me.getFormsearch().getValues();

        params["page"] = me.getGrid().getStore().currentPage;
        params["limit"] = me.getGrid().getStore().totalCount;
       // params["smscategory_id"] = me.getFormsearch().down("[name=smscategory_id]").getValue();
        p.setLoading("Please wait...");
        me.tools.ajax({
            params: params,
            success: function(data, model) {
                p.setLoading(false);
                var url = data['others'][0][0]['URL'];
                if (url) {
                    Ext.Msg.show({
                        title: 'Info',
                        msg: '<a href="' + url + '" target="blank">Download file</a>',
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK,
                        fn: function() {

                        }
                    });
                }


            }
        }).read('saveexcel');
    },
    xyReportProcessParams: function(reportData) {
        var me = this;
        var groupBy = reportData.params["Groupby"];
        var fn = me.reportFileName;
        var plId = 0;
        /// added
        var g = me.getGrid();
        var rec = g.getSelectedRecord();

        if (rec) {
            plId = rec.get("purchaseletter_id");
        } else {

        }
     
        // end added
        // reportData.params['con_string'] = "server=NB-MIS06\SQLEXPRESS;database=erems;user=sa;password=password12345";
        reportData['file'] = fn;
        reportData.params["purchaseletter_id"] = plId;
        return reportData;
    },
    showKartuPiutang: function() {
        var me = this;
        if (!me.xyReport) {
            me.xyReport = new Erems.library.XyReport();
            me.xyReport.init(me);
        }
        me.xyReport.processReport();
    },
   
    panelAfterRender: function(configs) {
        this.callParent(arguments);
        var me = this;
        me.tools.ajax({
            params: {},
            success: function(data, model) {

                me.fillFormSearchComponents(data, me.getFormsearch());
                me.reportFileName = data['others'][0][0]['FILE_REPORT'];
                me.SH1GITPL = data['others'][0][0]['SH1GITPL'];

            }
        }).read('searchassets');


    },
    fillFormSearchComponents: function(data, f) {
        var me = this;
        me.tools.wesea(data.cluster, f.down("[name=cluster_id]")).comboBox(true);

    },
    showViewForm: function() {
        var me = this;
        me.instantWindow('FormData', 800, 'General Information', 'update', 'myGeneralInformationFormData');
    },
    gridItemDblClick: function(el) {
        var me = this;
        me.instantWindow('FormData', 800, 'General Information', 'update', 'myGeneralInformationFormData');

    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();
        var x = {
            init: function() {
                me.setActiveForm(f);


            },
            create: function() {
                //f.up("window").maximize(true);
            },
            update: function() {
                var g = me.getGrid();
                var rec = g.getSelectedRecord();
                if (!rec) {
                    return;
                }
                
                if(me.SH1GITPL){
                    f.down("#pengalihanHakID1").show();
                    f.down("#pengalihanHakID2").show();
                    f.down("#pengalihanHakID3").show();
                    
                }

                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'GIDetailStore',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'purchaseletter_id'
                });
                f.setLoading("Loading price..");
                me.localStore.detail.load({
                    params: {
                        purchaseletter_id: rec.get("purchaseletter_id")
                    },
                    callback: function(recrespon, op) {
                        var f = me.getFormdata();
                        me.attachModel(op, me.localStore.detail, true);
                        var data = me.localStore.detail.data.items[0];
                        if (data) {
                            f.loadRecord(data);
                        }

                        f.down("[name=price_harga_jual]").setValue(accounting.formatMoney(f.down("[name=price_harga_jual]").getValue()));
                        f.down("[name=total_payment]").setValue(accounting.formatMoney(f.down("[name=total_payment]").getValue()));
                        f.down("[name=plbankkpr_kpr_realisation]").setValue(accounting.formatMoney(f.down("[name=plbankkpr_kpr_realisation]").getValue()));
                        f.down("[name=plbankkpr_kpr_cicilan]").setValue(accounting.formatMoney(f.down("[name=plbankkpr_kpr_cicilan]").getValue()));


                        var gp = me.getGridpayment();
                        f.setLoading("Loading payment..");
                        gp.doInit();
                        gp.getStore().load({
                            params: {
                                purchaseletter_id: rec.get("purchaseletter_id")
                            },
                            callback: function(recrespon, op) {
                                gp.attachModel(op);
                              //  f.setLoading(false);

                                var gu = me.getGridutility();
                                f.setLoading("Loading utility..");
                                gu.doInit();
                                gu.getStore().load({
                                    params: {
                                        purchaseletter_id: rec.get("purchaseletter_id")
                                    },
                                    callback: function(recut, op2) {
                                        gu.attachModel(op2);
                                        f.setLoading(false);


                                    }
                                });


                            }
                        });






                    }
                });



            }
        };
        return x;
    }




});