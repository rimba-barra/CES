Ext.define('Hrd.minic.absentrecord.Reason', {
    extend: 'Hrd.library.box.tools.Minic',
    formAlias: 'absentrecordformdatareason',
    refs: [
        {
            ref: 'formreason',
            selector: 'absentrecordformdatareason'
        }
    ],
    test: function() {
        alert("Test Reason");
    },
    getForm: function() {
        return this.getController().getFormreason();
    },
    
    fdar: function() {
        var me = this;
        var f = me.getForm();
        var mf = me.getController().getFormdata();
        /// configure date;
        var defaultDate = me.getController().getDefaultDate();
        f.down("[name=start_date]").setValue(defaultDate.sd);
        f.down("[name=end_date]").setValue(defaultDate.ed);

        f.down("[name=description]").setValue(mf.down("[name=description]").getValue());

        me.getController().comboboxLoad(["absenttype_id"], function() {

            f.down("[name=absenttype_id]").setValue(parseInt(me.getController().getFormdata().down("[name=absenttype_absenttype_id]").getValue()));
        }, me.getController().getFormreason());

    },
    mainDataSave: function() {
        var me = this;
        me.updateByRangeDate();
        return;
        var f = me.getForm();
        var v = f.getValues();
        console.log(f.getValues());
        var mf = me.getController().getFormdata();
        mf.down("[name=absenttype_absenttype]").setValue(f.down("[name=absenttype_id]").getSelectedText());
        mf.down("[name=absenttype_absenttype_id]").setValue(f.down("[name=absenttype_id]").getValue());
        mf.down("[name=description]").setValue(f.down("[name=note]").getValue());
        f.up("window").close();
        me.getController().mainDataSave();
    },
    updateByRangeDate: function() {
        var me = this;
        var g = me.getController().getGrid();
        var s = g.getStore();
        //   var arDay = [1, 2, 3, 4, 5];
        var arRec = [];
        var f = me.getForm();
        var mf = me.getController().getFormdata();
        var arDay = [];

        arDay = me.getValidDateRange(f.down("[name=start_date]").getValue(), f.down("[name=end_date]").getValue());
        if (arDay.length === 0) {
            Ext.Msg.alert('Error', 'Invalid date.');
            return;
        }


        s.each(function(rec) {

            if (rec != null) {
                for (var x in arDay) {
                    if (parseInt(rec.get("day")) === arDay[x]) {
                        var selectedShift = mf.down("[name=shifttype_shifttype_id]").getSelectedRec();
                    
                        var ss = {
                            code:'',
                            id:0
                        };
                        if(selectedShift){
                            ss.code = selectedShift.get("code"),
                            ss.id = selectedShift.get("shifttype_id")
                        }
                        arRec.push({
                            absentdetail_id: rec.get("absentdetail_id"),
                            absenttype_absenttype_id: f.down("[name=absenttype_id]").getValue(),
                            description: f.down("[name=description]").getValue(),
                            in_7_14: me.getController()._convertTime().formToGrid("timein"),
                            out_7_14: me.getController()._convertTime().formToGrid("timeout"),
                            shifttype_code: ss.code,
                            shifttype_shifttype_id: ss.id
                        });
                    }
                }
            }

        });
        
        

        var params = {
            mode_create: "updatebyrangedate",
            data: {
                detail: arRec
            }
        };


        Ext.Ajax.request({
            url: 'hrd/absentrecord/create',
            success: function(response) {
                var info = Ext.JSON.decode(response.responseText);
                Ext.Msg.alert('Status', info.msg);
                if (info.msg === "SUCCESS") {
                    f.up("window").close();
                    mf.up("window").close();
                    me.getController().getGrid().getStore().reload();
                }

            },
            params: {data: Ext.encode(params)}

        });

    }

});