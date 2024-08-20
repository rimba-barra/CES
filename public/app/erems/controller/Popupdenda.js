Ext.define('Erems.controller.Popupdenda', {
    extend: 'Erems.library.template.controller.Controller2',
    alias: 'controller.Popupdenda',
    requires: [
        'Erems.library.ModuleTools',
        'Erems.library.Browse',
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools',
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.XyReport',
        'Erems.library.template.component.Clustercombobox',
        'Erems.library.template.component.Blockcombobox'
    ],
    stores: ['Mastercluster'],
    views: ['popupdenda.Panel', 'popupdenda.Grid', 'popupdenda.FormSearch'],
    refs: [
        {
            ref: 'grid',
            selector: 'popupdendagrid'
        },

        {
            ref: 'panel',
            selector: 'popupdendapanel'
        },
        {
            ref: 'formsearch',
            selector: 'popupdendaformsearch'
        }

    ],
    controllerName: 'popupdenda',
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
    bindPrefixName: 'Popupdenda',
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
            'popupdendapanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'popupdendagrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'popupdendaformsearch': {
                afterrender: this.formSearchAfterRender,
            },
            'popupdendaformsearch button[action=search]': {
                click: this.dataSearch
            },
            'popupdendaformsearch button[action=reset]': {
                click: this.dataReset
            },
           'popupdendagrid toolbar button[action=printkurangbayar]': {
                click: function() {
                    me.printKurangBayar();
                }
            },
			'popupdendagrid toolbar button[action=export_excel]': {
                click: function(el) {
					this.dataExport(el, 'popupdenda');
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
    printKurangBayar: function() {
        var me = this;
        var p = me.getGrid()
        var cnId = me.getGrid().getSelectedRecord().get("unit_unit_number");
        p.setLoading(true);
        me.tools.ajax({
            params: {unit_unit_number: cnId},
            success: function(data) {

                p.setLoading(false);
                console.log(data);
                var url = data.URL;
                if (url) {
                    window.open(url);
                }
                /*
                var htmlcontent = data['others'][0][0]["HTML"];
                me.tools.browserPrint(htmlcontent);  
                */      
            }
        }
        ).read('printkurangbayar');
    },
	
	dataExport: function(el, popup_type) {
		var me = this;
		
		el.up('window').body.mask('Creating Excel File, Please Wait...');
		
		Ext.Ajax.timeout = 60000*30;
		
		Ext.Ajax.request({
			url: 'erems/popupmaster/read/?action=schema',
			params: {
					popup_type: popup_type,
					export_excel: 1
				},
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
    },

});
