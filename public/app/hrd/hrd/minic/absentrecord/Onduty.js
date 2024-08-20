Ext.define('Hrd.minic.absentrecord.Onduty', {
    extend: 'Hrd.library.box.tools.Minic',
    formAlias: 'absentrecordformdataonduty',
    refs: [
        {
            ref: 'formonduty',
            selector: 'absentrecordformdataonduty'
        }
    ],
    getForm: function() {
        return this.getController().getFormonduty();
    },
    fdar: function() {
        var me = this;

        var f = me.getForm();
        var mf = me.getController().getFormdata();

        /// configure date;
        var defaultDate = me.getController().getDefaultDate();
        f.down("[name=start_date]").setValue(defaultDate.sd);
        f.down("[name=end_date]").setValue(defaultDate.ed);

        me.getController().comboboxLoad(["parametertlk_parametertlk_id"], function() {
        }, me.getForm());

    },
    mainDataSave: function() {


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
        var selectedShift = mf.down("[name=shifttype_shifttype_id]").getSelectedRec();
        var ss = {
            code: '',
            id: 0
        };
        if (selectedShift) {
            ss.code = selectedShift.get("code"),
                    ss.id = selectedShift.get("shifttype_id")
        }
        
        s.each(function(rec) {

            if (rec != null) {
                for (var x in arDay) {
                    if (parseInt(rec.get("day")) === arDay[x]) {



                        arRec.push({
                            absentdetail_id: rec.get("absentdetail_id"),
                            parametertlk_parametertlk_id: f.down("[name=parametertlk_parametertlk_id]").getValue(),
                            description: f.down("[name=parametertlk_parametertlk_id]").getSelectedText(),
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
            mode_create: "absenttlk",
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
        return;
    }
});