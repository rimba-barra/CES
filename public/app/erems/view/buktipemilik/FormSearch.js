Ext.define('Erems.view.buktipemilik.FormSearch',{
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.buktipemilikformsearch',
    requires      : [],
    initComponent : function() {
        var me = this;

        Ext.applyIf(me, {
            defaults : me.generateDefaults(),
            items : [
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Unit Number',
                    itemId     : 'unit_number',
                    name       : 'unit_number',
                    anchor     :'-15'
                },
                {
                    xtype          : 'clustercombobox',
                    store          : '',
                    itemId         : 'fs_cluster_id',
                    name           : 'cluster_id',
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype          : 'projectptcombobox',
                    store          : '',
                    itemId         : 'fs_pt_id',
                    name           : 'pt_id',
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype          : 'blockcombobox',
                    store          : '',
                    itemId         : 'fs_block_id',
                    name           : 'block_id',
                    anchor         :'-15',
                    forceSelection : true,
                    listeners      :{
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype      : 'xnamefieldEST',
                    itemId     : 'customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer name',
                    anchor     : '-15'
                },
				{
                    xtype          : 'positioncombobox',
                    store          : '',
                    itemId         : 'fs_position_id',
                    name           : 'position_id',
                    anchor         :'-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype          : 'productcategorycombobox',
                    store          : '',
                    itemId         : 'fs_productcategory_id',
                    name           : 'productcategory_id',
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype          : 'typecombobox',
                    store          : '',
                    itemId         : 'fs_type_id',
                    name           : 'type_id',
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
				{
                    xtype          : 'unitstatuscombobox',
                    itemId         : 'fs_unitstatus_id',
                    name           : 'unitstatus_id', //name harus sama dengan valueField Unitstatuscombobox.js
                    anchor         : '-15',
                    forceSelection : true,
                    listeners      : {
                        beforequery : function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }

                },
				// for load notaris to form data
				// {
    //                 xtype          : 'notariscombobox',
    //                 store          : '',
    //                 itemId         : 'fd_hgbajb_notaris_id',
    //                 name           : 'notaris_id',
    //                 anchor         :'-15',
    //                 hidden         : true,
    //                 forceSelection : true,
    //                 listeners      : {
    //                     beforequery : function(record){
    //                         record.query = new RegExp(record.query, 'i');
    //                         record.forceAll = true;
    //                     }
    //                 }
    //             },
            ],
            dockedItems : me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});