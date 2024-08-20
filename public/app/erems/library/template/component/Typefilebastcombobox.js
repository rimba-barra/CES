Ext.define('Erems.library.template.component.Typefilebastcombobox', {
    extend     : 'Erems.library.component.Combobox',
    alias      : 'widget.typefilebastcombobox',
    fieldLabel : 'Jenis File',
    store      : new Ext.data.ArrayStore({
        fields : [
            'jenis_file',
            'jenis_file'
        ],
        data : [['BAST', 'BAST'], ['Undangan', 'Undangan'], ['Form Pemeriksaan Bangunan', 'Form Pemeriksaan Bangunan'], ['Sertifikat Layak ST', 'Sertifikat Layak ST'], ['Form Ceklis Bangunan', 'Form Ceklis Bangunan'], ['Surat Kuasa dan Identitas Diri', 'Surat Kuasa dan Identitas Diri']]
    }),
    displayField  : 'jenis_file',
    valueField    : 'jenis_file',
    initComponent : function() {
        var me = this;
        me.callParent(arguments);
    }
})