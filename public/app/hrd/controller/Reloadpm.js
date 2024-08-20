/*  JS CONTROLLER FOR 'Reloadpm' */

Ext.define('Hrd.controller.Reloadpm', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Reloadpm',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'reloadpm',
    fieldName: 'employee_id',
    bindPrefixName: 'Reloadpm',
    formWidth: 850,
    localStore: {},
    editingIndexRow: 0,
    refs: [
        {
            ref: 'griddetail',
            selector: 'reloadpmgriddetail'
        },
        {
            ref: 'formdatadetail',
            selector: 'reloadpmformdatadetail'
        },
        {
            ref: 'formpackagedocument',
            selector: 'packagemanagementformpackagedocument'
        },
        {
            ref: 'formapplytodoc',
            selector: 'reloadpmformapplytodoc'
        }
    ],
    dr: null,
    header_id: 0,
    employee_id: 0,
    checkpackagedockument: null,
    arraydata: null,
    constructor: function (configs) {
        var me = this;
        var config = new Hrd.library.box.tools.DefaultConfig({
            moduleName: me.controllerName
        });
        config.run(this);
        this.callParent(arguments);
    },

    init: function () {
        var me = this;
        var events = new Hrd.library.box.tools.EventSelector();
        this.control(events.getEvents(me, me.controllerName));
        me.tools = new Hrd.library.box.tools.Tools({config: me.myConfig});
        me.dr = new Hrd.library.box.tools.Dynamicrequest();
        var newEvs = {};
        
        newEvs['reloadpmformdata button[action=close]'] = {
            click: function () {
                var form = this.getFormdata();
                form.up('window').close();
            }
        };
        
        newEvs['reloadpmgrid'] = {
            cellclick: this.gridCellClick,
            itemdblclick:this.gridItemDblClick,
        };
        this.control(newEvs);
    },
        
    gridItemDblClick: function () {
        var me = this;
        return false;
        
    },
    gridCellClick: function(view, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;
        //cellIndex = 9 untuk kolom button Competency
        var kolom = '';
        var success_message = '';
        var msg = '';
        if(cellIndex == 9){
            kolom = 'competency';
            success_message = 'Competency reloaded';
            msg = 'Reload competency?';
        } else if(cellIndex == 10){
            kolom = 'packagedocument';   
            success_message = 'Package Document reloaded';    
            msg = 'Reload package?';     
        }
        
        if (kolom != ''){
            
            Ext.Msg.show({
                title: 'Confirm',
                msg: msg,
                width: 300,
                closable: false,
                buttons: Ext.Msg.YESNO,
                buttonText:
                        {
                            yes: 'YES',
                            no: 'CANCEL'
                        },
                multiline: false,
                fn: function (buttonValue, inputText, showConfig) {
                    if (buttonValue == 'yes') {
                        me.tools.ajax({
                            params: {
                                'employee_id': record.get('employee_id'),
                                'periode': record.get('periode')
                            },
                            success: function (data, model) {
                                var hasil = data.others[0][0]['SUCCESS'];
                                if(hasil == 1){
                                    me.tools.alert.info(success_message);
                                } else {
                                    me.tools.alert.warning("Problem when save data");
                                }
                            }
                        }).read('reload_' + kolom);
                    } else {
                    }
                },
                icon: Ext.Msg.QUESTION
            });

        }
    },

    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.project, f.down("[name=project_id]")).comboBox();
                me.tools.wesea(data.pt, f.down("[name=pt_id]")).comboBox();

                f.down("[name=project_id]").setValue(parseInt(apps.project));
                f.down("[name=pt_id]").setValue(parseInt(apps.pt));
            }
        }).read('listdept');
    },

    gridAfterRender: function() {
        var me = this;
        me.dataReset();
		
		//supaya paging langsung aktif tanpa user refresh secara manual
		var delay_task = new Ext.util.DelayedTask(function(){
			var s = me.getGrid().getStore();
			//s.remoteSort = true;
			s.reload();
		});
		delay_task.delay(50); 
    },
	
    fdar: function () {
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();

        me.setActiveForm(f);
        f.setLoading(false);

        var x = {
            init: function () {},
            create: function () {
               me.unMask(1);
            },
            update: function () {
                me.unMask(1);

                var gs = g.getStore();
                var rec = g.getSelectedRecord();
                if(!rec){
                       me.tools.alert.warning("Invalid record");
                }


                me.tools.ajax({
                   params: {},
                   success: function (data, model) {      
                       //var datafilter = me.filterPackagedocument(data.packagedocument);
                       me.tools.wesea(datafilter, f.down("[name=pmdocument_id]")).comboBox();
                                               f.loadRecord(rec);
                   }
                }).read('headerdata');
               /*
               var employee_id = rec.data.employee_id;
               var detailGrid = me.getGriddetail();

               detailGrid.doInit();
               detailGrid.getStore().load({
                   params: {
                       employee_id: employee_id
                   },

                   callback: function (recs, op) {
                       detailGrid.attachModel(op);
                   }
               });
               */
              

                
            }
        };

        return x;
    },
	
    mainDataSave: function () {
        /*
        var me = this;
        var f = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = f.editedRow;
        var vs = f.getValues();
        var page = 1;

        me.tools.ajax({
                params: vs,
                success: function (data, model) {      
                        //console.log(data.others[0][0]['HASIL']);
                        var hasil = data.others[0][0]['HASIL'];
                        if(hasil == 1){
                                me.tools.alert.info("Success");
                                f.up('window').close();

                                me.loadPageAndFocus();
                                //s.loadPage(1); // getcurrenctpage
                        } else {
                                me.tools.alert.warning("Problem when save data");
                        }

                }
        }).read('savepackagedocument');
        */

    },
    
    gridActionColumnClick: function (view, cell, row, col, e) {
        e.preventDefault();
        var me = this;
        var gr = me.getGrid();
        var record = gr.getStore().getAt(row);
        var m = e.getTarget().className.match(/\bact-(\w+)\b/);

        if (m) {
            switch (m[1]) {
                case 'edit':
                    console.log('edit test ');
                    break
                case 'destroy':
                    console.log('destroy test ');
                    break
            }
        }
    },
    
    //for callback (function in function)
    tcb: function () {
        //var me = this;
        //me.listEmp();
    },
    
    loadPageAndFocus: function () {
        var me, page, index, s;
        me = this;
        s = me.getGrid().getStore();
        mainform = me.getFormdata();
		s.currentPage = s.currentPage;
		s.load({
			callback: function(s){ 
				var employee_id = mainform.down("[name=employee_id]").getValue();
				if(employee_id != undefined){
					var index 		= me.getGrid().getStore().findExact('employee_id', employee_id*1);
					index > -1 ? me.getGrid().getSelectionModel().select(index) : '';
				}
			} 
		});
    }
});