/*  JS CONTROLLER FOR 'Approvalmatrix' */

Ext.define('Hrd.controller.Parameterclaim', {
    extend: 'Hrd.library.box.controller.Controller',
    alias: 'controller.Parameterclaim',
    requires: [
        'Hrd.library.box.tools.Tools',
        'Hrd.library.box.tools.DefaultConfig',
        'Hrd.library.box.tools.EventSelector',
        'Hrd.library.Box.Tools.Browse',
        'Hrd.library.box.tools.Dynamicrequest',
    ],
    controllerName: 'parameterclaim',
    fieldName: 'employee_id',
    bindPrefixName: 'Parameterclaim',
    formWidth: 850,
    localStore: {},
    editingIndexRow: 0,
    refs: [
        {
            ref: 'gridgolongan',
            selector: 'parameterclaimgridgolongan'
        },
        // {
        //     ref: 'formdatadetail',
        //     selector: 'approvalmatrixformdatadetail'
        // },
        // {
        //     ref: 'formpackagedocument',
        //     selector: 'packagemanagementformpackagedocument'
        // },
        // {
        //     ref: 'formapplytodoc',
        //     selector: 'approvalmatrixformapplytodoc'
        // }
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


        // newEvs['parameterclaimformdata button[action=save]'] = {
        //     click: function () {
        //         var me;
        //         me = this;
        //         me.saveParam();
        //     }
        // };
        
        this.control(newEvs);
    },

    panelAfterRender: function (el) {
        var me = this;
        var f = me.getFormsearch();
        me.tools.ajax({
            params: {},
            success: function (data, model) {
                me.tools.wesea(data.department, f.down("[name=department_id]")).comboBox();
                me.tools.wesea(data.projectsh, f.down("[name=project_id]")).comboBox();
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
                    
                parameterjenispengobatan_id = rec.data.parameterjenispengobatan_id;

				me.tools.ajax({
                    params: {},
                    success: function (data, model) {      
                        me.tools.wesea(data.claimbasedon, f.down("[name=claimbasedon_id]")).comboBox();
                        me.tools.wesea(data.claimupdate, f.down("[name=claimupdate_id]")).comboBox();
						f.loadRecord(rec);
                    }
                }).read('detailClaim');


                gridgroup = me.getGridgolongan();

                gridgroup.doInit();
                me.tools.ajax({
                        params: {
                            parameterjenispengobatan_id: parameterjenispengobatan_id
                        },
                        success: function(data, model) {
                            me.tools.wesea({data: data, model: model}, gridgroup).grid();
                            gridgroup.setLoading(false);
                        }
                    }).read('detailGroup');
              

                
            }
        };

        return x;
    },
	
    mainDataSave: function () {
        var me = this;
        var form = me.getFormdata();
        var g = me.getGrid();
        var s = g.getStore();
        var row = form.editedRow;
		var vs = form.getValues();
		var page = 1;
		
		if(form.down('[name=sex]').getValue() == '' || form.down('[name=sex]').getValue() == null){
            me.tools.alert.warning("Gender masih kosong");
            return false;
        } else {
            sex = form.down('[name=sex]').getValue();
        }

        if(form.down('[name=employeestatus_id]').getValue() == '' || form.down('[name=employeestatus_id]').getValue() == null){
            me.tools.alert.warning("Min Status Karyawan masih kosong");
            return false;
        } else {
            employeestatus_id = form.down('[name=employeestatus_id]').getValue();
        }

        if(form.down('[name=claimbasedon_id]').getValue() == '' || form.down('[name=claimbasedon_id]').getValue() == null){
            me.tools.alert.warning("Klaim berdasarkan tanggal masih kosong");
            return false;
        } else {
            claimbasedon_id = form.down('[name=claimbasedon_id]').getValue();
        }

        if(form.down('[name=claimupdate_id]').getValue() == '' || form.down('[name=claimupdate_id]').getValue() == null){
            me.tools.alert.warning("Update jika ada perubahan masih kosong");
            return false;
        } else {
            claimupdate_id = form.down('[name=claimupdate_id]').getValue();
        }

        min_workingmonth = form.down('[name=min_workingmonth]').getValue();

        maxclaim = form.down('[name=maxclaim]').getValue();

        masterjenispengobatan_id = form.down('[name=masterjenispengobatan_id]').getValue();

        parameterjenispengobatan_id = form.down('[name=parameterjenispengobatan_id]').getValue();

        jenispengobatan = form.down('[name=jenispengobatan]').getValue();

        var ggroup = me.getGridgolongan();
        var sggroup = ggroup.getStore();
        var data_group = sggroup.data.items;
        
        var ids_groupId = '';
        var ids_groupMin = '';
        var ids_groupFreq = '';
        var ids_groupMinSpecial = '';
        var ids_groupFreqSpecial = '';

        $.each(data_group, function (key, value) {
            var data_cell_current = value.data;

            if (data_cell_current.group_id != null) {
                ids_groupId += data_cell_current.group_id + "~";
                ids_groupMin += data_cell_current.min_age + "~";
                ids_groupFreq += data_cell_current.frequently_inmonth + "~";
                ids_groupMinSpecial += data_cell_current.min_age_special + "~";
                ids_groupFreqSpecial += data_cell_current.frequently_inmonth_special + "~";
            }

        });

        Ext.Msg.confirm('Confirm', "Apakah anda sudah yakin dengan Parameter Jenis Pengobatan yang ada setting?", function (btn) {
            if (btn == 'yes') {
                form.setLoading('Please wait...');
        		me.tools.ajax({
        			params: {
                        sex : sex,
                        employeestatus_id : employeestatus_id,
                        claimbasedon_id : claimbasedon_id,
                        claimupdate_id : claimupdate_id,
                        min_workingmonth : min_workingmonth,
                        maxclaim : maxclaim,
                        masterjenispengobatan_id : masterjenispengobatan_id,
                        parameterjenispengobatan_id : parameterjenispengobatan_id,
                        ids_groupId : ids_groupId,
                        ids_groupMin : ids_groupMin,
                        ids_groupFreq : ids_groupFreq,
                        ids_groupMinSpecial : ids_groupMinSpecial,
                        ids_groupFreqSpecial : ids_groupFreqSpecial
                    },
        			success: function (data, model) {      
        				form.setLoading(false);
                        form.up("window").close();
                        me.tools.alert.info("Success! Silahkan buka kembali Parameter Jenis Pengobatan <b>"+jenispengobatan+"</b> untuk memastikan data sudah terupdate");
                        me.gridAfterRender();
        				
        			}
        		}).read('saveParam');
		      }
        });
		
		/*
        me.insSave({
            form: f,
            grid: g,
            finalData: function (data) {
                return data;
            },
            sync: true,
            callback: {
                create: function (store, form, grid) {}
            }
        });
		*/
    },

});