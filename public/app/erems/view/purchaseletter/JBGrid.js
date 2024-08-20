Ext.define('Erems.view.purchaseletter.JBGrid', {
    extend         : 'Erems.library.template.view.GridDS2',
    alias          : 'widget.jenisbiayagrid',
    store          : 'Jenisbiayapurchaseletter',
    height         : 'auto',
    bindPrefixName : 'Purchaseletter',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            selModel    : {},
            viewConfig  : { stripeRows : true },
            columns     : [
                {
                    xtype : 'rownumberer'
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'purchaseletter_jenis_biaya_id',
                    text      : 'purchaseletter_jenis_biaya_id',
                    hidden    : true
                },
                {
                    xtype     : 'gridcolumn',
                    dataIndex : 'jenis_biaya',
                    text      : 'Jenis Biaya',
                    sortable  : false,
                    width     : 625
                },
                {
                    xtype      : 'booleancolumn',
                    dataIndex  : 'is_use',
                    text       : '<input type="checkbox" name="chk_all_jenis_biaya"/>',
                    width      : 50,
                    align      : 'center',
                    falseValue : '0',
                    trueValue  : '1',
                    sortable   : false,
                    renderer   : me.inlineEditisuse,
                    listeners  : {
                        // afterrender : function(a,b,c,d,e,f,g){
                        //     // console.log(me)
                        //     console.log(a,b,c,d,e,f,g)
                        //     // console.log(me.down('[name=chk_all_jenis_biaya]'))
                        //     a.text = '<input type="checkbox" name="chk_all_jenis_biaya" checked/>';
                        //     console.log(a.el.dom)
                        // },
                        headerclick : function(x,y,z,q,w,a,b){
                            me.getStore().each(function(rec){
                                rec.beginEdit();
                                rec.set({ is_use : z.target.checked });
                                rec.endEdit();
                            });
                        },
                        click : function(x,y,z,q,w,a,b){
                            a.beginEdit();
                            a.set({ is_use : w.target.checked });
                            a.endEdit();
                        }
                    }
                },
                me.generateActionColumn()
            ],
        });

        me.callParent(arguments);
    },
    inlineEditisuse: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_use';
        return this.comboBoxFieldGen(name, record, true);  
    },
    comboBoxFieldGen: function(name, record, enable){
        var data = record.get('biaya_purchaseletter_id');
        if (record.get(name)) {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" value="1" data=' + data + ' checked />';
            }else{
                var a = '&#10003;';
            }
        }else {
            if(enable){
                var a = '<input type="checkbox" name="'+name+'" value="0" data=' + data + ' />';
            }else{
                var a = '';
            }
        }
        return a;  
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [];
        return dockedItems;
    },
});