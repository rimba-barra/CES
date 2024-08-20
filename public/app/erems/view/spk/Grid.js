Ext.define('Erems.view.spk.Grid',{
    alias:'widget.spkgrid',
    bindPrefixName:'Spk',
    newButtonLabel:'New Spk',
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'SpkGridStore',
        idProperty:'spk_id',
        extraParams:{}
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'code',
                    text: 'Code'
                },
                {
                    dataIndex: 'spk_no',
                    width:150,
                    text: 'SPK No'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'spk_date',
                    text: 'SPK Date'
                },
                {
                    dataIndex: 'time_duration',
                    text: 'Implement Time'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'started',
                    text: 'Start',
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    dataIndex: 'ended',
                    text: 'End'


                },
                {
                    dataIndex: 'contractor_contractorname',
                    text: 'Contractor'
                },
                {
                    dataIndex: 'job_title',
                    text: 'Title'
                },
                {
                    dataIndex: 'description',
                    text: 'Desc'
                },
                {
                    xtype:'numbercolumn',
                    dataIndex: 'job_fee',
                    text: 'Fee'
                },
                {
                    dataIndex: 'spktype_spktype',
                    text: 'Type'
                },
                {
                    dataIndex: 'progress',
                    text: 'Progress'
                },
		 {
                    dataIndex: 'jumlah_unit',
                    text: 'Sum Unit'
                },
                {
                    dataIndex: 'status_note',
                    text: 'Status Note'
                },
                {
                    dataIndex: 'status',
                    text: 'Status'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});