Ext.define('Erems.controller.Formorderijb', {
   extend: 'Erems.library.template.controller.Controllerstimulsoft', //Controller2
    requires: ['Erems.library.Browse', 
        'Erems.library.box.Config',
        'Erems.library.box.tools.Tools', 
        'Erems.template.ComboBoxFields',
        'Erems.library.box.tools.EventSelector',
        'Erems.library.ModuleTools'],
    alias: 'controller.Formorderijb',
    views: ['formorderijb.Panel', 'formorderijb.Grid', 'formorderijb.FormSearch', 'formorderijb.FormData'],
    refs: [
        {
            ref: 'grid',
            selector: 'formorderijbgrid'
        },
        {
            ref: 'formsearch',
            selector: 'formorderijbformsearch'
        },
        {
            ref: 'formdata',
            selector: 'formorderijbformdata'
        },
        {
            ref: 'unitgrid',
            selector: 'formorderijbunitgrid'
        },
        {
            ref: 'panel',
            selector: 'formorderijbpanel'
        }
    ],
    controllerName: 'formorderijb',
    fieldName: 'formorderijb_id',
    formWidth: 800,
    bindPrefixName:'Formorderijb',
    localStore: {
        detail: null,
        selectedUnit: null,
        customer: null
    },
    browseHandler: null,
    cbf: null,
    mt: null,
    reportFileView : null,
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
        var events = new Erems.library.box.tools.EventSelector();
        
        this.control({
            'formorderijbpanel': {
                afterrender: this.panelAfterRender,
                beforerender: me.mainPanelBeforeRender
             
            },
            'formorderijbgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'formorderijbgrid toolbar button[action=create]': {
                click: function() {
                    me.instantWindow('FormData', 800, 'Form Order IJB', 'create');
                }
            },
            'formorderijbgrid toolbar button[action=update]': {
                click: function() {
                    me.instantWindow('FormData', 800, 'Form Order IJB', 'update');
                }
            },
            'formorderijbgrid toolbar button[action=destroy]': {
                click: this.dataDestroy
            },
            'formorderijbgrid toolbar button[action=print]': {
                click: this.dataPrint
            },
            'formorderijbgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'formorderijbformsearch button[action=search]': {
                click: this.dataSearch
            },
            'formorderijbformsearch button[action=reset]': {
                click: this.dataReset
            },
            'formorderijbformdata': {
                afterrender: this.formDataAfterRender
            },
            'formorderijbformdata button[action=save]': {
                click: this.mainDataSave
            },
            'formorderijbformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'formorderijbformdata button[action=browse_unit]': {
                click: this.browseSoldUnit
            },
            'formorderijbunitgrid button[action=select]': {
                click: this.unitSelect
            },
            'formorderijbformdata [name=is_terbitshgb]': {
                change: function (field, newValue, oldValue, desc) {
                    me.TerbitShgbClick(newValue);
                }
            },
            'formorderijbformdata [name=is_pbb]': {
                change: function (field, newValue, oldValue, desc) {
                    me.IsPBBClick(newValue);
                }
            },
            'formorderijbformdata [name=is_retribusi]': {
                change: function (field, newValue, oldValue, desc) {
                    me.IsRetribusiClick(newValue);
                }
            },
            'formorderijbformdata [name=posisiberkascs_date]': {
                change: function (field, newValue, oldValue, desc) {
                    me.posisiberkascs_dateChange(newValue);
                }
            },
            'formorderijbformdata [name=posisiberkasbackoffice_date]': {
                change: function (field, newValue, oldValue, desc) {
                    me.posisiberkasbackoffice_dateChange(newValue);
                }
            },
            'formorderijbformdata [name=posisiberkascekfinance_date]': {
                change: function (field, newValue, oldValue, desc) {
                    me.posisiberkascekfinance_dateChange(newValue);
                }
            },
            'formorderijbformdata [name=posisiberkasambilsertifikat_date]': {
                change: function (field, newValue, oldValue, desc) {
                    me.posisiberkasambilsertifikat_dateChange(newValue);
                }
            },
			'formorderijbgrid toolbar button[action=printx]': {
                click: function () {
                    //me.showPdf();
					me.processReport();
                }
            },
            // 'formorderijbformdata [name=is_biaya_splitzing]': {
            //     change: function (field, newValue, oldValue, desc) {
            //         me.IsBiayaSplitzingClick(newValue);
            //     }
            // },
        });
    },
    gridAfterRender: function (configs) {
        this.callParent(arguments);
        var me = this;

        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.reportFileView = data.others[0][0].file_report;
            }
        }).read('config');
    },
    mainDataSave: function() {
        var me = this;

        me.tools.iNeedYou(me).save();
    },
    fdar: function() {
        var me = this;
        var f = me.getFormdata();

        me.mt = new Erems.library.ModuleTools();
        

        //
        var x = {
            init: function() {

                me.setActiveForm(f);
                
                me.localStore.detail = me.instantStore({
                    id: me.controllerName + 'MainFormorderijb',
                    extraParams: {
                        mode_read: 'maindetail'
                    },
                    idProperty: 'formorderijb_id'
                });
            },
            create: function() {
                var that = this;
                f.editedRow = -1;
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function (data, model) {

                        me.fillFormComponents(data, f);

                        f.down("[name=posisiberkasbackoffice_date]").setReadOnly(true);
                        f.down("[name=posisiberkascekfinance_date]").setReadOnly(true);
                        f.down("[name=posisiberkasambilsertifikat_date]").setReadOnly(true);
                        f.down("[name=posisiberkaskirimnotaris_date]").setReadOnly(true);
                        f.down("[name=shgb_no]").setReadOnly(true);
                        f.down("[name=shgb_luas]").setReadOnly(true);
                        f.down("[name=shgb_kelurahan]").setReadOnly(true);
                        f.down("[name=pbb_tahun]").setReadOnly(true);
                        f.down("[name=pbb_njop]").setReadOnly(true);
                        f.down("[name=pbb_luastanah]").setReadOnly(true);
                        f.down("[name=pbb_luasbangunan]").setReadOnly(true);
                        // f.down("[name=biaya_splitzing]").setReadOnly(true);
                        
                        me.localStore.detail.load({
                            params: {
                                formorderijb_id: 0
                            },
                            callback: function (rec, op) {
                                me.attachModel(op, me.localStore.detail, false);

                            }
                        });
                    }
                }).read('detail');

            },
            update: function() {
                var that = this;
                f.editedRow = me.getGrid().getSelectedRow();
                var rec = me.getGrid().getSelectedRecord();
                f.down("[name=formorderijb_date]").setValue(me.getGrid().getSelectedRecord().get("formorderijb_date"));
                f.loadRecord(rec);
                me.tools.ajax({
                    params: {
                        // purchaseletter_id: plId
                    },
                    success: function (data, model) {

                        me.fillFormComponents(data, f);
                        
                        me.localStore.detail.load({
                            params: {
                                formorderijb_id: me.getGrid().getSelectedRecord().get("formorderijb_id")
                            },
                            callback: function(rec, op) {
                                me.attachModel(op, me.localStore.detail, false);
                                var rec = me.localStore.detail.getAt(0);
                                
                                me.TerbitShgbClick(rec.get("is_terbitshgb"));
                                me.IsPBBClick(rec.get("is_pbb"));
                                // me.IsBiayaSplitzingClick(rec.get("is_biaya_splitzing"));
                                me.posisiberkascs_dateChange(rec.get("posisiberkascs_date"));
                                me.posisiberkasbackoffice_dateChange(rec.get("posisiberkasbackoffice_date"));
                                me.posisiberkascekfinance_dateChange(rec.get("posisiberkascekfinance_date"));
                                me.posisiberkasambilsertifikat_dateChange(rec.get("posisiberkasambilsertifikat_date"));
                                f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_id"));
                                
                                f.loadRecord(rec);
                            }
                        });
                    }
                }).read('detail');
            }
            
        };
        return x;
    },
    browseSoldUnit: function (el) {
        var me = this;
        var browse = new Erems.library.Browse();
        browse.init({
            controller: me,
            view: 'UnitGrid',
            el: el,
            localStore: "selectedUnit",
            mode_read: "selectedunit"
        });
        browse.showWindow();
    },
    
    unitSelect: function () {
        var me = this;
        if (me.browseHandler) {
            me.browseHandler.selectItem(function (rec) {
                var f = me.getFormdata();

				//// comment by TB on 2019-07-18
                // me.tools.ajax({
                    // params: {
                        // purchaseletter_id: rec.get("purchaseletter_id")
                    // },
                    // success: function (data, model) {
                        // var isallowed = data['others'][0][0]['ISALLOWED'];
                        // var msg = data['others'][0][0]['MSG'];
                        // if (isallowed) {

                        // } else {
                            // me.tools.alert.warning(msg);
                        // }

                    // }
                // }).read('checkijbunit');

                f.down("[name=purchaseletter_purchaseletter_id]").setValue(rec.get("purchaseletter_id"));


            });
        }
    },
    
    fillFormComponents: function (data, form) {
        var me = this;
        //me.tools.wesea(data.city, form.down("[name=customer_city]")).comboBox();
		me.tools.wesea(data.city, form.down("[name=pengalihanhak_city]")).comboBox();

    },
    TerbitShgbClick: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue){
            f.down("[name=shgb_no]").setReadOnly(false);
            f.down("[name=shgb_luas]").setReadOnly(false);
            f.down("[name=shgb_kelurahan]").setReadOnly(false);
        }else{
            f.down("[name=shgb_no]").setReadOnly(true);
            f.down("[name=shgb_luas]").setReadOnly(true);
            f.down("[name=shgb_kelurahan]").setReadOnly(true);
        }
    },
    IsPBBClick: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue){
            f.down("[name=pbb_tahun]").setReadOnly(false);
            f.down("[name=pbb_njop]").setReadOnly(false);
            f.down("[name=pbb_luastanah]").setReadOnly(false);
            f.down("[name=pbb_luasbangunan]").setReadOnly(false);
        }else{
            f.down("[name=pbb_tahun]").setReadOnly(true);
            f.down("[name=pbb_njop]").setReadOnly(true);
            f.down("[name=pbb_luastanah]").setReadOnly(true);
            f.down("[name=pbb_luasbangunan]").setReadOnly(true);
        }
    },
    IsBiayaSplitzingClick: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue){
            f.down("[name=biaya_splitzing]").setReadOnly(false);
        }else{
            f.down("[name=biaya_splitzing]").setReadOnly(true);
        }
    },
    IsRetribusiClick: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue){
            f.down("[name=retirbusi_periode]").setReadOnly(false);
        }else{
            f.down("[name=retirbusi_periode]").setReadOnly(true);
        }
    },
    posisiberkascs_dateChange: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue!=''){
            f.down("[name=posisiberkasbackoffice_date]").setReadOnly(false);
        }else{
            f.down("[name=posisiberkasbackoffice_date]").setReadOnly(true);
        }
    },
    posisiberkasbackoffice_dateChange: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue!=''){
            f.down("[name=posisiberkascekfinance_date]").setReadOnly(false);
        }else{
            f.down("[name=posisiberkascekfinance_date]").setReadOnly(true);
        }
    },
    posisiberkascekfinance_dateChange: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue!=''){
            f.down("[name=posisiberkasambilsertifikat_date]").setReadOnly(false);
        }else{
            f.down("[name=posisiberkasambilsertifikat_date]").setReadOnly(true);
        }
    },
    posisiberkasambilsertifikat_dateChange: function (newValue) {
        var me = this;
        var f = me.getFormdata();
        if(newValue!=''){
            f.down("[name=posisiberkaskirimnotaris_date]").setReadOnly(false);
        }else{
            f.down("[name=posisiberkaskirimnotaris_date]").setReadOnly(true);
        }
    },
	
	processReport: function() {
        var me = this;
		
		var rec = me.getGrid().getSelectedRecord();
		if (rec) {
			var winId = 'myReportWindow';
			me.instantWindow('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
			
			var win = desktop.getWindow(winId);

			if (win) {
				var params = [];
				
				var dateNow = new Date();
				
				//header
				params["formorderijb_id"] = rec.get("formorderijb_id");
                var html = me.generateFakeForm2(params,me.reportFileView);
				
				win.down("#MyReportPanel").body.setHTML(html);
				$("#fakeReportFormID").submit();
			}
		}
    }
});