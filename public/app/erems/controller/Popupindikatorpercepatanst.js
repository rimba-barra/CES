Ext.define('Erems.controller.Popupindikatorpercepatanst', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Popupindikatorpercepatanst',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport'
    ],
    views: ['popupindikatorpercepatanst.Panel', 'popupindikatorpercepatanst.Grid', 'popupindikatorpercepatanst.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupindikatorpercepatanstgrid'
        },

        {
            ref: 'panel',
            selector: 'popupindikatorpercepatanstpanel'
        },
        {
            ref: 'formsearch',
            selector: 'popupindikatorpercepatanstformsearch'
        }

    ],
    controllerName: 'popupindikatorpercepatanst',
    fieldName: 'payment_id',
    formWidth: 800,
    fillForm: null,
    unitFormula: null,
    paymentFunc: null,
    browseHandler: null,
    dateNow: new Date(),
    flaggeneratevoucherno: 0,
    state: null,
    accept_date: null,
    pt_id: 0,
    stData: {},
    bindPrefixName: 'Popupindikatorpercepatanst',
    localStore: {
        selectedUnit: null,
        customer: null,
        price: null,
        detail: null
    },
    tagihanDefaultValue: false,
    tools: null,
    myConfig: null,
    cbf: null,
    mt: null,
    stList: null, // list of schedule type
    effectedSch: [], // list schedule id yang dibayar
    formxWinId: 'win-instalpaymentwinId',
    paymentId: 0,

    constructor: function (configs) {
        this.callParent(arguments);
        var me = this;
        this.myConfig = new Erems.library.box.Config({
            _controllerName: me.controllerName
        });

        me.cbf = new Erems.template.ComboBoxFields();
    },
    xyReport: null,
    printOutData: null,
    globalParams: null,
    globalParamsForm: null,
    selectedPurchaseletter: null,
    myParams: {
        paymentteks: null,
        global: null
    },
    init: function (application) {
        var me = this;

        me.tools = new Erems.library.box.tools.Tools({config: me.myConfig});
        var events = new Erems.library.box.tools.EventSelector();

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

        if (typeof moment !== 'function') {


            Ext.Loader.injectScriptElement(document.URL + 'app/erems/library/moment.min.js', function () {
            }, function () {
            });
        }

        this.control({
            'popupindikatorpercepatanstpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupindikatorpercepatanstgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            
            'popupindikatorpercepatanstformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupindikatorpercepatanstformsearch button[action=reset]': {
                click: this.dataReset
            },
            'popupindikatorpercepatanstgrid toolbar button[action=export_excel]':{
                click: function(el) {
                    this.dataExport(el);
                }
            }
           

        });
    },
    
    execAction: function (el, action, me) {
        /* KOSONG */
    },
    showFormdata: function (action) {
        var me = this;
    },

    dataExport: function(el) {
        var me = this;
        el.up('window').body.mask('Creating Excel File, Please Wait...');
        var params              = me.getFormsearch().getValues();
        params["page"]          = me.getGrid().getStore().currentPage;
        
        Ext.Ajax.timeout = 60000*30;
        Ext.Ajax.request({
            url: 'erems/popupindikatorpercepatanst/export',
            params:params,
            success: function(response) {
                try{
                    var resp = response.responseText;
                    
                    if(resp) {
                        var info = Ext.JSON.decode(resp);
                        
                        if(info.success == true){
                            el.up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Info',
                                msg: '<a href="' + info.url + '" target="blank">Click Here For Download Excel File</a>',
                                icon: Ext.Msg.INFO,
                                //buttons: [], //jika ingin tidak ada buttons
                                buttons: Ext.Msg.CANCEL,
                                buttonText : 
                                {
                                    cancel : 'Close',
                                }
                            });
                        } else {
                            el.up('window').body.unmask();
                            Ext.Msg.show({
                                title: 'Failure',
                                msg: 'Error: Export to Excel Failed.',
                                icon: Ext.Msg.ERROR,
                                buttons: Ext.Msg.OK
                            });
                        }
                    }
                }catch(e){
                    //console.error(e);
                    el.up('window').body.unmask();
                    Ext.Msg.show({
                        title: 'Failure',
                        msg: 'Error: Export to Excel Failed.',
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function(e){
                //console.error(e);
                el.up('window').body.unmask();
                Ext.Msg.show({
                    title: 'Failure',
                    msg: 'Error: Export to Excel Failed.',
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    }

});
