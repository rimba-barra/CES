Ext.define('Cashier.controller.Schemaescrow', {
    extend: 'Cashier.library.template.controller.Controllermodule',
    alias: 'controller.Schemaescrow',
	requires: ['Cashier.library.DetailtoolAll'],
    views: ['schemaescrow.Panel', 'schemaescrow.Grid', 'schemaescrow.FormSearch', 'schemaescrow.FormData', 'schemaescrow.PencairanGrid'],
    stores: ['Schemaescrow','Ptbyusermulti', 'Purchaseletterdetail', 'Pencairankpr','Bankkpr','Masterbankkpr','Masterplafon','Pencairankprduedateescrow'],
    models: ['Schemaescrow','Projectpt', 'Purchaseletterdetail', 'Pencairankpr','Bankkpr','Masterbankkpr','Masterplafon','Pencairankprduedateescrow'],
    detailTool: null,
	detailTool2: null,
    refs: [
        {
            ref: 'panel',
            selector: 'schemaescrowpanel'
        },
        {
            ref: 'grid',
            selector: 'schemaescrowgrid'
        },
        {
            ref: 'formdata',
            selector: 'schemaescrowformdata'
        },
        {
            ref: 'formsearch',
            selector: 'schemaescrowformsearch'
        },
        {
            ref: 'pencairangrid',
            selector: 'schemaescrowpencairangrid'
        },
        {
            ref: 'pencairanformdatadetail',
            selector: 'schemaescrowpencairanformdatadetail'
        },
    ],
    controllerName: 'schemaescrow',
    fieldName: 'purchaseletter_id',
	enableEditPencairanAmount:1,
    bindPrefixName: 'Schemaescrow',
    isAlreadyAkad: 1,
    rowproject: null, storept: null, state: null,
    init: function(application) {
        var me = this;
        this.control({
            'schemaescrowpanel': {
                beforerender: me.mainPanelBeforeRender,
                afterrender: this.panelAfterRender

            },
            'schemaescrowgrid': {
                afterrender: this.gridAfterRender,
                itemdblclick: this.gridItemDblClick,
                itemcontextmenu: this.gridItemContextMenu,
                selectionchange: this.gridSelectionChange
            },
            'schemaescrowgrid toolbar button[action=create]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('create');
                }
            },
            'schemaescrowgrid toolbar button[action=update]': {
                click: function() {
                    me.state = 'create';
                    this.formDataShow('update');
                }
            },
            'schemaescrowgrid actioncolumn': {
                afterrender: this.gridActionColumnAfterRender,
                click: this.gridActionColumnClick
            },
            'schemaescrowformsearch': {
                    afterrender: this.formSearchAfterRender
            },
            'schemaescrowformsearch button[action=search]': {
                click: this.dataSearch
            },
            'schemaescrowformsearch button[action=reset]': {
                click: this.dataReset
            },
            'schemaescrowformdata': {
                afterrender: this.formDataAfterRender
            },
            'schemaescrowformdata button[action=save]': {
                click: this.dataSavePencairan
            },
            'schemaescrowformdata button[action=cancel]': {
                click: this.formDataClose
            },
            'schemaescrowpencairangrid toolbar button[action=create]': {
                click: function() {
                        me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
                }
            },
            'schemaescrowpencairangrid button[action=generateschema]': {
                    click: me.setGenerateSchema
            },
            'schemaescrowpencairangrid button[action=addschema]': {
                    click: function() {
                            me.detailTool.form().show('create', 500, 'New'); //'adddetailpencarian' petik terakhir bisa kosong atau tidak
                    }
            },
            'schemaescrowpencairanformdatadetail': {
                beforerender: this.formDataPencairanDetailBeforeRender,
            },
            'schemaescrowpencairanformdatadetail button[action=save]': {
                click: me.detailForm.save
            },
            'schemaescrowpencairangrid actioncolumn' : {
                afterrender: this.pencairangridActionColumnAfterRender,
                click: me.detailGrid.actionColumnClick
            },
            
            'schemaescrowpencairanformdatadetail [name=persen_pencairan]': {
                keyup: me.detailForm.fillPencairanAmount
            },
            'schemaescrowpencairangrid button[action=printschema]': {
                    click: function() {
                            me.processReport();
                    }
            },
        });
    },
    formDataAfterRender: function(el){
        var me = this;
        var grid = me.getGrid();
        var store = grid.getStore();
        var form = me.getFormdata();
        var record = store.getAt(store.indexOf(grid.getSelectionModel().getSelection()[0]));
        $("#win-holidayformdata_header-targetEl .x-tool-maximize").click();
        el.loadRecord(record);
        me.detailTool = new Cashier.library.DetailtoolAll();
        me.detailTool.setConfig({
           viewPanel: 'PencairanFormDataDetail',
           parentFDWindowId: me.getFormdata().up('window').id,
           controllerName: me.controllerName
       });
       me.detailTool.parentGridAlias = 'schemaescrowpencairangrid';
       
        var purchaseletterdetailStore = me.getPurchaseletterdetailStore();
        purchaseletterdetailStore.removeAll();
        purchaseletterdetailStore.load({params: {purchaseletter_id: record.data.purchaseletter_id, mode_read: 'detail'}, 
        callback: function(purchaselettedetailrec) {
            //load grid Pencairan KPR
            
            var kpr_value_approve = purchaselettedetailrec[0].get('kpr_value_approve');
            form.down('[name=kpr_value_approve]').setValue(me.fmb(kpr_value_approve));

            var pencairankprStore = me.getPencairankprStore();
            pencairankprStore.removeAll();
            pencairankprStore.load({params: {purchaseletter_id: record.data.purchaseletter_id},
                    callback: function(pencairanrec) {
                            me.tcb_synch();
                    }
            });
        }});
    
        var pencairanGrid = me.getPencairangrid();
        pencairanGrid.down('#actioncolumn').setVisible(true);
        pencairanGrid.getView().getHeaderCt().child('#colms_bilyet_no').show();
    },
    tcb_synch:function(){
            var me = this;
            me.setDueDateEscrow();
            me.setProgressConst();
    },
    setProgressConst: function() {
            var me = this;

            var winId = me.detailTool.parentFDWindowId;
            var win = desktop.getWindow(winId);	

            //var pencairanForm = me.getPencairanformdata();
            var pencairanForm = win.down('form');
            var pencairanGrid = me.getPencairangrid();
            var pencairanStore = pencairanGrid.getStore();

            var unitId = pencairanForm.down('[name=unit_id]').getValue();
            var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

            var pencairankprduedateescrowStore = me.getPencairankprduedateescrowStore();
                    pencairankprduedateescrowStore.removeAll();
                    pencairankprduedateescrowStore.load({params: {unit_id: unitId, purchaseletter_id: purchaseletterId, get_data_type: 'progress_status'}, 
                            callback: function(rec) {
                                    var list_progress = [];

                                    for(var i=0; i<rec[0].raw.length; i++){
                                            list_progress.push(rec[0].raw[i].plafon_id);
                                    }

                                    pencairanStore.each(function(record,idx){
                                            var recd = pencairanStore.getAt(idx);
                                            if(list_progress.indexOf(record.data.plafon_id) == -1){
                                                    recd.set("persen_progress", 0);
                                            } else {
                                                    recd.set("persen_progress", 100);
                                            }
                                    });
                            }
                    });
    },
    formDataPencairanDetailBeforeRender: function(el) {
		var me = this;	

            var txt = el.down('[name=pencairan_amount]');
            if(me.enableEditPencairanAmount === 1){
                    txt.setReadOnly(false);
            } else {
                    txt.setReadOnly(true);
            }

            var ftStore = null;
            ftStore = el.down('[name=plafon_id]').getStore();
            ftStore.removeAll();
            ftStore.load({params:{start:0,limit:0}});
    },
    setDueDateEscrow: function() {
            var me = this;

            var winId = me.detailTool.parentFDWindowId;
            var win = desktop.getWindow(winId);	

            //var pencairanForm = me.getPencairanformdata();
            var pencairanForm = win.down('form');
            var pencairanGrid = me.getPencairangrid();
            var pencairanStore = pencairanGrid.getStore();

            var unitId = pencairanForm.down('[name=unit_id]').getValue();
            var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();

            var pencairankprduedateescrowStore = me.getPencairankprduedateescrowStore();
                    pencairankprduedateescrowStore.removeAll();
                    pencairankprduedateescrowStore.load({params: {unit_id: unitId, purchaseletter_id: purchaseletterId}, 
                            callback: function(rec) {
                                    for(var i=0; i<rec[0].raw.length; i++)
                                    {
                                            pencairanStore.each(function(record,idx){
                                                    if(record.data.plafon_id == rec[0].raw[i].plafon_id){
                                                            var recd = pencairanStore.getAt(idx);
                                                            recd.set("duedate_escrow", rec[0].raw[i].duedate_escrow);
                                                    }
                                            });
                                    }
                            }
                    });
    },
    panelAfterRender: function () {
        var me = this;
        var f = me.getFormsearch();
        var projectpt_id = 0;
        me.getFormsearch().down("[name=projectpt_id]").getStore().load();
        Ext.Ajax.request({
            url: 'cashier/common/read',
            method: 'POST',
            timeout:100000000,	
            params: {
                hideparam :'getptbyuserid',
                project_project_id: apps.project,
                pt_pt_id: apps.pt,
                user_id: apps.uid,
                start: 0,
                limit: 1000,
            },
            success: function (response) {
                response = Ext.JSON.decode(response.responseText);
                //console.log(response.data[0]['projectpt_id']);
                projectpt_id = response.data[0]['projectpt_id'];
                f.down("[name=projectpt_id]").setValue(parseInt(projectpt_id));
                me.dataSearch();
                var grid = me.getGrid();
                grid.setLoading('Please wait');
                var storear = grid.getStore();
                storear.load({
                    callback: function () {
                        grid.setLoading(false);
                    }
                });
            },
            failure: function (response) {
                
            }
        });
        console.log(projectpt_id);
        
    },
    detailForm: {
        that: this,
        editingIndexRow: 0,
        fillPencairanAmount: function(){
                var me = this;

                var winId = me.detailTool.parentFDWindowId;
                var win = desktop.getWindow(winId);	
                var formParent = win.down('form');

                var persen_pencairan = toFloat(me.getPencairanformdatadetail().down('[name=persen_pencairan]').getValue());
                //var kpr_value_approve = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());
                var kpr_value_approve = toFloat(formParent.down('[name=kpr_value_approve]').getValue());
                var pencairan_amount = (persen_pencairan * kpr_value_approve) / 100;
                me.getPencairanformdatadetail().down('[name=pencairan_amount]').setValue(me.fmb(pencairan_amount));
        },
        save: function() {
            var me = this;
			
            var winId = me.detailTool.parentFDWindowId;
            var win = desktop.getWindow(winId);	
            var formParent = win.down('form');
            //console.log(formParent.down('[name=purchaseletter_id]').getValue());

            var form = me.getPencairanformdatadetail().getForm();
            var formVal = me.getPencairanformdatadetail().getForm().getValues();
            var pencairanAmount = formVal.pencairan_amount;

            //var purchaseletterId = me.getPencairanformdata().down('[name=purchaseletter_id]').getValue();
            //var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());

            var purchaseletterId = formParent.down('[name=purchaseletter_id]').getValue();
            var totalRealisasi = toFloat(formParent.down('[name=kpr_value_approve]').getValue());

            var keterangan = me.getPencairanformdatadetail().down('[name=plafon_id]').getRawValue();

            var msg = '';
            var erR = 0;

            /*if (toFloat(pencairanAmount) <= 0) {
                msg = 'Zero Amount';
                erR++;
            }*/
            if (erR++) {
                Ext.Msg.show({
                    title: 'Alert',
                    msg: msg,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK,
                    fn: function() {

                    }
                });
            } else {
                if (form.isValid()) {

                                var dStore = null;
                                var win = me.getPencairanformdatadetail().up('window');

                                dStore = me.getPencairangrid().getStore();
                                var listPlafonId = [];
                                dStore.each(function(rec) {
                                        if (rec != null) {
                                                listPlafonId.push(rec.get('plafon_id'));
                                        }
                                });

                                var val = {purchaseletter_id: purchaseletterId, 
                                                        payment_id: formVal.payment_id, 
                                                        escrow_date: formVal.escrow_date, 
                                                        pencairan_date: formVal.pencairan_date, 
                                                        persen_pencairan: formVal.persen_pencairan, 
                                                        pencairan_amount: toFloat(formVal.pencairan_amount),
                                                        pengajuan_berkas_date: formVal.pengajuan_berkas_date,
                                                        plafon_id: formVal.plafon_id,
                                                        keterangan: keterangan,
                                                        duedate_escrow: formVal.duedate_escrow,
                                                        bilyet_no: formVal.bilyet_no,
                                                        realisation_date: formVal.realisation_date};

                                if (win.state == 'create') {
                                        if(listPlafonId.indexOf(formVal.plafon_id) == -1){
                                                dStore.add(val);
                                        } else {
                                                Ext.Msg.show({
                                                        title: 'Warning', 
                                                        msg: 'Plafon sudah terdaftar',
                                                        icon: Ext.Msg.WARNING,
                                                        buttons: Ext.Msg.OK
                                                });	
                                        }
                                } else {

                                        var rec = dStore.getAt(me.detailForm.editingIndexRow);
                                        rec.beginEdit();
                                        rec.set(val);
                                        rec.endEdit();
                                }

                                win.close();

                }
            }
        }
    },
    setGenerateSchema: function() {
            var me = this;

            var winId = me.detailTool.parentFDWindowId;
            var win = desktop.getWindow(winId);	

            //var pencairanForm = me.getPencairanformdata();
            var pencairanForm = win.down('form');
            var pencairanGrid = me.getPencairangrid();
            var pencairanStore = pencairanGrid.getStore();

            var purchaseletterId = pencairanForm.down('[name=purchaseletter_id]').getValue();
            var bankId = 0;
            var kprRealisation = 0; 
            var allowedgenerate = true;
            
            Ext.Ajax.request({
                url: 'cashier/pencairankpr/read',
                method: 'POST',	
                async: false ,
                params: {
                    purchaseletter_id: purchaseletterId,
                    read_type_mode: 'checkallowedgenerate'
                },
                success: function (rspns) {
                    var dataresponse = Ext.JSON.decode(rspns.responseText);
                    allowedgenerate = dataresponse.data['allowedgenerate'];
                },
                failure: function (rspns) {

                }
            });

            var bankkprStore = me.getBankkprStore();
                    bankkprStore.removeAll();
                    bankkprStore.load({params: {purchaseletter_id: purchaseletterId}, 
                            callback: function(purchaselettedetailrec) {
                                    for(var i=0; i<bankkprStore.getCount(); i++)
                                    {
                                            bankkprStore.each(function(record,idx){
                                                    if(i == idx){ 
                                                            if(record.data.is_use == true)
                                                            {
                                                                    bankId = record.data.bank_id
                                                                    kprRealisation = parseFloat(record.data.kpr_realisation);
                                                            }
                                                    }
                                            });        	
                                    }
                                    if(bankId != 0) {
                                        if(allowedgenerate == true){
                                            var masterbankkprStore = me.getMasterbankkprStore();
                                                    masterbankkprStore.removeAll();
                                                    masterbankkprStore.load({params: {bank_id: bankId}, 
                                                            callback: function(rec) {
                                                                    if(pencairanStore.getCount() > 0){  //jika ada record cek dulu
                                                                            if(masterbankkprStore.getCount() > 0){

                                                                                    pencairanStore.each(function(record,idx){
                                                                                            if(!record.data.pencairan_date || record.data.pencairan_date == null || record.data.pencairan_date == ''){
                                                                                                if(record.data.kasbank_id==null || record.data.kasbank_id=='' || !record.data.kasbank_id){
                                                                                                    var recd = pencairanStore.getAt(idx);
                                                                                                    recd.set("deleted", true);
                                                                                                }
                                                                                            }
                                                                                    });
                                                                                    pencairanStore.filterBy(function(recod){return recod.data.deleted==false;});

                                                                                    var tahap1ID = pencairanStore.find('plafon_id', rec[0].get('tahap1_id'));
                                                                                    var tahap2ID = pencairanStore.find('plafon_id', rec[0].get('tahap2_id'));
                                                                                    var tahap3ID = pencairanStore.find('plafon_id', rec[0].get('tahap3_id'));
                                                                                    var tahap4ID = pencairanStore.find('plafon_id', rec[0].get('tahap4_id'));
                                                                                    var tahap5ID = pencairanStore.find('plafon_id', rec[0].get('tahap5_id'));
                                                                                    var tahap6ID = pencairanStore.find('plafon_id', rec[0].get('tahap6_id'));
                                                                                    var tahap7ID = pencairanStore.find('plafon_id', rec[0].get('tahap7_id'));
                                                                                    var tahap8ID = pencairanStore.find('plafon_id', rec[0].get('tahap8_id'));

                                                                                    if(tahap1ID == -1 && rec[0].get('tahap1_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap1_persen') * kprRealisation)/100, rec[0].get('tahap1_persen'), '', rec[0].get('tahap1_id'), rec[0].get('tahap1_name')));
                                                                                    }
                                                                                    if(tahap2ID == -1 && rec[0].get('tahap2_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap2_persen') * kprRealisation)/100, rec[0].get('tahap2_persen'), '', rec[0].get('tahap2_id'), rec[0].get('tahap2_name')));
                                                                                    }
                                                                                    if(tahap3ID == -1 && rec[0].get('tahap3_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap3_persen') * kprRealisation)/100, rec[0].get('tahap3_persen'), '', rec[0].get('tahap3_id'), rec[0].get('tahap3_name')));
                                                                                    }
                                                                                    if(tahap4ID == -1 && rec[0].get('tahap4_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap4_persen') * kprRealisation)/100, rec[0].get('tahap4_persen'), '', rec[0].get('tahap4_id'), rec[0].get('tahap4_name')));
                                                                                    }
                                                                                    if(tahap5ID == -1 && rec[0].get('tahap5_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap5_persen') * kprRealisation)/100, rec[0].get('tahap5_persen'), '', rec[0].get('tahap5_id'), rec[0].get('tahap5_name')));
                                                                                    }
                                                                                    if(tahap6ID == -1 && rec[0].get('tahap6_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap6_persen') * kprRealisation)/100, rec[0].get('tahap6_persen'), '', rec[0].get('tahap6_id'), rec[0].get('tahap6_name')));
                                                                                    }
                                                                                    if(tahap7ID == -1 && rec[0].get('tahap7_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap7_persen') * kprRealisation)/100, rec[0].get('tahap7_persen'), '', rec[0].get('tahap7_id'), rec[0].get('tahap7_name')));
                                                                                    }
                                                                                    if(tahap8ID == -1 && rec[0].get('tahap8_id') != 0){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap8_persen') * kprRealisation)/100, rec[0].get('tahap8_persen'), '', rec[0].get('tahap8_id'), rec[0].get('tahap8_name')));
                                                                                    }

                                                                                    me.tcb_synch();

                                                                            }  else {
                                                                                    Ext.Msg.alert('Info', 'Bank KPR yang digunakan belum memiliki Schema Pencairan');
                                                                            }
                                                                    } else { //jika ga ada record lsg insert
                                                                            if(masterbankkprStore.getCount() > 0){
                                                                                    if(rec[0].get('tahap1_name') && rec[0].get('tahap1_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap1_persen') * kprRealisation)/100, rec[0].get('tahap1_persen'), '', rec[0].get('tahap1_id'), rec[0].get('tahap1_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap2_name') && rec[0].get('tahap2_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap2_persen') * kprRealisation)/100, rec[0].get('tahap2_persen'), '', rec[0].get('tahap2_id'), rec[0].get('tahap2_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap3_name') && rec[0].get('tahap3_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap3_persen') * kprRealisation)/100, rec[0].get('tahap3_persen'), '', rec[0].get('tahap3_id'), rec[0].get('tahap3_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap4_name') && rec[0].get('tahap4_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap4_persen') * kprRealisation)/100, rec[0].get('tahap4_persen'), '', rec[0].get('tahap4_id'), rec[0].get('tahap4_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap5_name') && rec[0].get('tahap5_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap5_persen') * kprRealisation)/100, rec[0].get('tahap5_persen'), '', rec[0].get('tahap5_id'), rec[0].get('tahap5_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap6_name') && rec[0].get('tahap6_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap6_persen') * kprRealisation)/100, rec[0].get('tahap6_persen'), '', rec[0].get('tahap6_id'), rec[0].get('tahap6_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap7_name') && rec[0].get('tahap7_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap7_persen') * kprRealisation)/100, rec[0].get('tahap7_persen'), '', rec[0].get('tahap7_id'), rec[0].get('tahap7_name')));
                                                                                    }

                                                                                    if(rec[0].get('tahap8_name') && rec[0].get('tahap8_persen')){
                                                                                            pencairanStore.add(me.valPencairan(purchaseletterId, '', '', new Date(), '', (rec[0].get('tahap8_persen') * kprRealisation)/100, rec[0].get('tahap8_persen'), '', rec[0].get('tahap8_id'), rec[0].get('tahap8_name')));
                                                                                    }

                                                                                    me.tcb_synch();

                                                                            } else {
                                                                                    Ext.Msg.alert('Info', 'Bank KPR yang digunakan belum memiliki Schema Pencairan');
                                                                            }
                                                                    }
                                                    }});	
                                        }else{
                                            Ext.Msg.alert('Info', 'Belum melakukan [F9] penempatan escrow pada voucher / KPR Full Payment');
                                        }
                                    } else {
                                            Ext.Msg.alert('Info', 'Belum Memilih Bank untuk KPR');
                                    }
                            }
                    });
    },
    valPencairan: function(purchaseletterId, paymentId, scheduleId, escrowDate, pencairanDate, pencairanAmount, persenPencairan, persenProgress, plafonId, Keterangan){
            return {
                    purchaseletter_id: purchaseletterId, 
                    payment_id: paymentId, 
                    schedule_id: scheduleId, 
                    escrow_date: escrowDate, 
                    pencairan_date: pencairanDate,
                    pencairan_amount: pencairanAmount,
                    persen_pencairan: persenPencairan, 
                    persen_progress: persenProgress, 
                    plafon_id: plafonId, 
                    keterangan: Keterangan
            }
    },

    pencairangridActionColumnAfterRender: function(el){
            var me = this;
            var actitem = el.items;

            Ext.each(actitem, function(item, index) {
                    item.getClass = function() {
                            if(index == 0){
                                    return 'ux-actioncolumn ' + 'icon-edit' + ' act-' + 'PencairankprUpdate';
                            } 
                            if(index == 1){
                                    return 'ux-actioncolumn ' + 'icon-delete' + ' act-' + 'PencairankprDelete';
                            }
                    };
            });
    }
    ,
    detailGrid: {
        that: this,
		actionColumnClick: function(view, cell, row, col, e) {
			console.log(e);
            var me = this;
            var gr = me.getPencairangrid();
            var record = gr.getStore().getAt(row);
            var m = e.getTarget().className.match(/\bact-(\w+)\b/);
            gr.getSelectionModel().select(row); 
			
			if(m){
				var btnDelPencairan = m.input.match(/x-item-disabled/gi);
			}
			
            if (m) {
                    console.log(m[1]);
                switch (m[1]) {
                    case 'PencairankprUpdate':
					/*if (record.get('pencairan_date') && record.dirty == false) {
						Ext.Msg.show({
							title: 'Warning', 
							msg: 'Pencairan yang sudah memiliki tanggal cair tidak dapat diubah.',
							icon: Ext.Msg.WARNING,
							buttons: Ext.Msg.OK
						});	
					} else {*/
					
                        me.detailTool.form().show('update', 500, 'Edit');
                        me.detailForm.editingIndexRow = row;
                        me.getPencairanformdatadetail().getForm().setValues({
							purchaseletter_pencairankpr_id: record.get('purchaseletter_pencairankpr_id'),
							purchaseletter_id: record.get('purchaseletter_id'),
							payment_id: record.get('payment_id'),
							schedule_id: record.get('schedule_id'),
                            escrow_date: record.get('escrow_date'),
                            pencairan_date: record.get('pencairan_date'),
							persen_pencairan: (record.get('persen_pencairan')) ? me.fmb(record.get('persen_pencairan')) : 0,//record.get('persen_pencairan'),
                            pencairan_amount: me.fmb(record.get('pencairan_amount')),
							plafon_id: record.get('plafon_id'),
							pengajuan_berkas_date: record.get('pengajuan_berkas_date'),
							duedate_escrow: record.get('duedate_escrow'),
							bilyet_no: record.get('bilyet_no'),
							realisation_date: record.get('realisation_date')
                        });
						
						if (record.get('pencairan_date') && !record.isModified('pencairan_date') && record.get('purchaseletter_pencairankpr_id')) {
							me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(true);
							me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(true);
						} else {
							me.getPencairanformdatadetail().down('[name=escrow_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pengajuan_berkas_date]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=persen_pencairan]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=pencairan_amount]').setReadOnly(false);
							me.getPencairanformdatadetail().down('[name=duedate_escrow]').setReadOnly(false);
						}
					//}
                        break;
                    case 'PencairankprDelete':
					if(!btnDelPencairan){
						//if (record.get('pencairan_date') && record.dirty == false) {
						if (record.get('pencairan_date') && !record.isModified('pencairan_date') && record.get('purchaseletter_pencairankpr_id')) {
							Ext.Msg.show({
								title: 'Warning', 
								msg: 'Pencairan yang sudah memiliki tanggal cair tidak dapat dihapus.',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});	
						} else if (record.get('kasbank_id')!='' && record.get('kasbank_id')!=null){
                                                    Ext.Msg.show({
								title: 'Warning', 
								msg: 'Pencairan yang sudah memiliki voucher tidak dapat dihapus.',
								icon: Ext.Msg.WARNING,
								buttons: Ext.Msg.OK
							});
                                                }else {
							record.set("deleted", true);
							gr.getStore().filterBy(function(recod){return recod.data.deleted==false;});
							break;
						}
					}
                }
            }
        },
		hitungRealisasi: function(ctrl) {
            var me = ctrl;
            var dStore = me.getPencairangrid().getStore();
            var total = 0;
            dStore.each(function(rec) {
                if (rec != null) {
                    total += toFloat(rec.get('pencairan_amount'));
                }
            });
			return total;
        },
		hitungTotalPersenPencairan: function(ctrl){
			var me = ctrl;
            var dStore = me.getPencairangrid().getStore();
            var total = 0;
            dStore.each(function(rec) {
				if (rec != null) {
					if(rec.get('persen_pencairan') != null){
                    	total += toFloat(rec.get('persen_pencairan'));
					}
                }
            });
			return total;
		}
    },

    dataSavePencairan: function() {
            var me = this;
            var store = me.getPencairangrid().getStore();

            var winId = me.detailTool.parentFDWindowId;
            var win = desktop.getWindow(winId);	
            var formParent = win.down('form');
            //console.log(winId); //win-pencairanformdata, win-fullpaymentformdata

            if(me.isAlreadyAkad == 1){

                    if(store.getCount() == 0)
                    {
                                    Ext.Msg.show({
                                            title: 'Alert', 
                                            msg: 'Detail Pencairan Records cannot be empty.',
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK,
                                    });	 
                                    return false;
                    }	    

                    var totalPencairanAmountGrid = toFloat(me.detailGrid.hitungRealisasi(me));
                    //var totalRealisasi = toFloat(me.getPencairanformdata().down('[name=kpr_value_approve]').getValue());
                    var totalRealisasi = toFloat(formParent.down('[name=kpr_value_approve]').getValue());
                    
                    if(isNaN(totalPencairanAmountGrid)){
                            totalPencairanAmountGrid = 0;
                    }
                    if(isNaN(totalRealisasi)){
                            totalRealisasi = 0;
                    }

                    totalPencairanAmountGrid = Math.round(totalPencairanAmountGrid * 100) / 100;
                    totalRealisasi = Math.round(totalRealisasi * 100) / 100;

                    var totalPersenPencairan = toFloat(me.detailGrid.hitungTotalPersenPencairan(me));
                    if(totalPersenPencairan != 100){
                            Ext.Msg.show({
                                    title: 'Alert',
                                    msg: 'Total Persen Pencairan harus 100%',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                            });
                            return false;
                    }
                    //else if(totalPencairanAmountGrid > totalRealisasi){
                    else if(totalPencairanAmountGrid != totalRealisasi){
                            console.log(totalPencairanAmountGrid);
                            console.log(totalRealisasi);
                            var msgText = 'Skema Pencairan harus sama dengan Total Realisasi<br />Total Realisasi: Rp. '+me.fmb(totalRealisasi)+'<br />Skema Pencairan: Rp. '+me.fmb(totalPencairanAmountGrid)+'<br />Selisih: Rp. '+me.fmb((totalPencairanAmountGrid-totalRealisasi));

                            Ext.Msg.show({
                                    title: 'Alert',
                                    //msg: 'Total Pencairan Amount\n\nlebih besar dari Total Realisasi',
                                    msg: msgText,
                                    icon: Ext.Msg.WARNING,
                                    buttons: Ext.Msg.OK
                            });
                            return false;

                    } else {

                            store.clearFilter(true);

                            //me.getPencairanformdata().up('window').body.mask('Saving, please wait ...');
                            formParent.up('window').body.mask('Saving, please wait ...');
                            var data = []; 
                            for(var i=0; i<store.getCount(); i++)
                            {
                                    store.each(function(record,idx){
                                            if(i == idx){ 
                                                    if(record.data.keterangan){
                                                            record.data.keterangan = '';
                                                    }
                                                    data[i] = record.data; 
                                            }
                                    });        	
                            }

                            var myObj = {
                                    winId : winId,
                                    data_detail : data
                            }

                            Ext.Ajax.request({
                              url:'cashier/pencairankpr/create',
                              //params:'data='+Ext.encode(data),
                              params:{
                                      data: Ext.encode(myObj)
                              },
                              success:function(response){ 

                              try{
                                            var resp = response.responseText;
                                            if(resp) {
                                                    var info = Ext.JSON.decode(resp);
                                                    //me.getPencairanformdata().up('window').body.unmask();
                                                    //if(Ext.decode(response.responseText).success == true)
                                                    if(info.success == true)
                                                    {			
                                                            //me.getPencairanformdata().up('window').body.unmask();			
                                                            formParent.up('window').body.unmask();			
                                                            Ext.Msg.show({
                                                                    title: 'Success', 
                                                                    msg: 'Data saved successfully.',
                                                                    icon: Ext.Msg.INFO,
                                                                    buttons: Ext.Msg.OK,
                                                                    fn: function(){ 
                                                                            //me.getPencairanformdata().up('window').close(); 
                                                                            formParent.up('window').close(); 
                                                                            var gridDepan = me.getGrid();
                                                                            var storeDepan = gridDepan.getStore();	
                                                                            storeDepan.reload();
                                                                    }
                                                            });	

                                                    }
                                                    else {
                                                            //me.getPencairanformdata().up('window').body.unmask();
                                                            formParent.up('window').body.unmask();
                                                            Ext.Msg.show({
                                                                    title: 'Failure', 
                                                                    msg: 'Error: Unable to save data.',
                                                                    icon: Ext.Msg.ERROR,
                                                                    buttons: Ext.Msg.OK
                                                            });									
                                                    }
                                            }
                                    }catch(e){
                                            //console.error(e);
                                            //me.getPencairanformdata().up('window').body.unmask();
                                            formParent.up('window').body.unmask();
                                            Ext.Msg.show({
                                                            title: 'Failure', 
                                                            msg: 'Error: Unable to save data.',
                                                            icon: Ext.Msg.ERROR,
                                                            buttons: Ext.Msg.OK
                                                    });			
                                    }
                              },
                            });	

                    }
            } else {
                    store.clearFilter(true);

                    //me.getPencairanformdata().up('window').body.mask('Saving, please wait ...');
                    formParent.up('window').body.mask('Saving, please wait ...');
                    var data = []; 
                    for(var i=0; i<store.getCount(); i++)
                    {
                            store.each(function(record,idx){
                                    if(i == idx){ 
                                            if(record.data.keterangan){
                                                    record.data.keterangan = '';
                                            }
                                            data[i] = record.data; 
                                    }
                            });        	
                    }

                    var myObj = {
                            winId : winId,
                            data_detail : data
                    }

                    Ext.Ajax.request({
                      url:'cashier/pencairankpr/create',
                      //params:'data='+Ext.encode(data),
                      params:{
                              data: Ext.encode(myObj)
                      },
                      success:function(response){ 

                      try{
                                    var resp = response.responseText;
                                    if(resp) {
                                            var info = Ext.JSON.decode(resp);
                                            //me.getPencairanformdata().up('window').body.unmask();
                                            //if(Ext.decode(response.responseText).success == true)
                                            if(info.success == true)
                                            {			
                                                    //me.getPencairanformdata().up('window').body.unmask();			
                                                    formParent.up('window').body.unmask();			
                                                    Ext.Msg.show({
                                                            title: 'Success', 
                                                            msg: 'Data saved successfully.',
                                                            icon: Ext.Msg.INFO,
                                                            buttons: Ext.Msg.OK,
                                                            fn: function(){ 
                                                                    //me.getPencairanformdata().up('window').close(); 
                                                                    formParent.up('window').close(); 
                                                                    var gridDepan = me.getGrid();
                                                                    var storeDepan = gridDepan.getStore();	
                                                                    storeDepan.reload();
                                                            }
                                                    });	

                                            }
                                            else {
                                                    //me.getPencairanformdata().up('window').body.unmask();
                                                    formParent.up('window').body.unmask();
                                                    Ext.Msg.show({
                                                            title: 'Failure', 
                                                            msg: 'Error: Unable to save data.',
                                                            icon: Ext.Msg.ERROR,
                                                            buttons: Ext.Msg.OK
                                                    });									
                                            }
                                    }
                            }catch(e){
                                    //console.error(e);
                                    //me.getPencairanformdata().up('window').body.unmask();
                                    formParent.up('window').body.unmask();
                                    Ext.Msg.show({
                                                    title: 'Failure', 
                                                    msg: 'Error: Unable to save data.',
                                                    icon: Ext.Msg.ERROR,
                                                    buttons: Ext.Msg.OK
                                            });			
                            }
                      },
                    });	
            }
    },
    processReport: function() {
        var me = this;
		
		var winId = me.detailTool.parentFDWindowId;
		var win = desktop.getWindow(winId);	
		var formParent = win.down('form');
		
        var winId = 'myReportWindow';
        me.instantWindowReport('Panel', 800, 'Result ', 'state-report', winId, 'masterreport');
        var win = desktop.getWindow(winId);

        if (win) {
			var params = {};
			var reportFile = "Pencairankpr";
			
			//params["purchaseletter_id"] =  me.getPencairanformdata().down('[name=purchaseletter_id]').getValue();
			//params["unit_id"] =  me.getPencairanformdata().down('[name=unit_id]').getValue();
			params["purchaseletter_id"] = formParent.down('[name=purchaseletter_id]').getValue();
			params["unit_id"] = formParent.down('[name=unit_id]').getValue();
			params["image_url"] = window.location.protocol+"//"+window.location.host+'/webapps/Ciputra/public/app/erems/uploads/progress_unit/';
					
			var html = me.generateFakeForm(params, reportFile);
			win.down("#MyReportPanel").body.setHTML(html);
			$("#fakeReportFormID").submit();
        }
    },
    generateFakeForm:function(paramList,reportFile){		
        var form = '<form id="fakeReportFormID" action=resources/stimulsoft/index.php?stimulsoft_client_key=ViewerFx&stimulsoft_report_key='+reportFile+'.mrt" target="my-iframe" method="post" style="visibility:hidden;height:0;width:0">';
        for(var x in paramList){
            if(paramList[x]===null){
                paramList[x]='';
            }
            form +='<input type="hidden" name="'+x+'" value="'+paramList[x]+'">';
        }
        form +='<input type="submit" value="post"></form>';
        form +='<iframe name="my-iframe" style="height:100%;width:100%;"></iframe>';
        return form;
    },
    instantWindowReport: function(panel, width, title, state, id, controller) {
        var me = this;
        var formtitle, formicon;


        title = typeof title == 'undefined' ? 'My Window' : title;
        id = typeof id == 'undefined' ? 'myInstantWindow' : id;
        state = typeof state == 'undefined' ? 'create' : state;
        panel = typeof panel == 'undefined' ? 'Panel' : panel;
        width = typeof width == 'undefined' ? 600 : width;
        var controllerFolder = typeof controller === 'undefined' ? me.controllerName : controller;
        formtitle = title;
        formicon = 'icon-form-add';
        var winId = id;



        var win = desktop.getWindow(winId);
        if (!win) {
            win = desktop.createWindow({
                id: winId,
                title: formtitle,
                iconCls: formicon,
                resizable: true,
                minimizable: false,
                maximizable: true,
                width: width,
                renderTo: Ext.getBody(),
                constrain: true,
                constrainHeader: false,
                modal: true,
                layout: 'fit',
                shadow: 'frame',
                shadowOffset: 10,
                border: false,
                items: Ext.create('Cashier.view.' + controllerFolder + '.' + panel),
                state: state
            });
        }
        win.show();
    },
});