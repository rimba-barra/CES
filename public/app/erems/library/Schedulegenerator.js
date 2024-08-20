Ext.define('Erems.library.Schedulegenerator', {
    srcTotal: 0,
    defaultValue: 'p',
    valFromCombobox: true, /// false if value from textfield (tandajadi and uangmuka)
    form:null,
    fields:{
        total:'_total_jual',
        j_tanda_jadi:'j_tanda_jadi',
        j_uang_muka:'j_uang_muka',
        j_sisa:'j_sisa',
        n_tanda_jadi:'n_tanda_jadi',
        n_uang_muka:'n_uang_muka',
        n_sisa:'n_sisa'
    },
    spDate:null,
    typePrice:4,
    dataGrid: [],
    tandaJadi: {
        nilai: 0,
        jumlah: 1,
        persen: 10
    },
    uangMuka: {
        nilai: 0,
        jumlah: 1,
        persen: 10
    },
    sisa: {
        nilai: 0.00,
        jumlah: 1
    },
    setSrcTotal: function(t) {
        this.srcTotal = toFloat(t);
    },
    setTypePrice:function(tp){
        this.typePrice = tp;
    },
    setSpDate:function(s){
        this.spDate = s;
    },
    processInput:function(){
        var f = this.form;
        if(f==null){
            console.log('[ERROR][SG] FORM NOT EXISTS');
            return false;
        }
        var jtj = null,jum=null,js=null,ntj=null,num=null,ns=null;
        var ptj = toFloat(this.tandaJadi.persen),pum = toFloat(this.uangMuka.persen);
        this.srcTotal = toFloat(f.down('[name='+this.fields.total+']').getValue());
        var tj = this.srcTotal;
        if(this.valFromCombobox){ /// jika nilai cicilan ambil dari formula database
           /// tanda jadi 
           if(ptj > 0){
               ntj = (ptj/100)*tj;
           }else{
               ntj = this.tandaJadi.nilai;
           }
           //// uang muka
           if(pum > 0){
               num = (pum/100)*tj;
           }else{
               num = this.uangMuka.nilai;
           }
           
           ns = tj - num;
           jtj = this.tandaJadi.jumlah;
           jum = this.uangMuka.jumlah;
           js = this.sisa.jumlah;
           
           
        }else{  // nilai cicilan dari keyboard 
            
            jtj = toFloat(f.down('[name='+this.fields.j_tanda_jadi+']').getValue());
            jum = toFloat(f.down('[name='+this.fields.j_uang_muka+']').getValue());
            js = toFloat(f.down('[name='+this.fields.j_sisa+']').getValue());
            ntj = toFloat(f.down('[name='+this.fields.n_tanda_jadi+']').getValue());
            num = toFloat(f.down('[name='+this.fields.n_uang_muka+']').getValue());
            ns = toFloat(f.down('[name='+this.fields.n_sisa+']').getValue());
        
        }
        this.tandaJadi.jumlah = jtj;
        this.uangMuka.jumlah = jum;
        this.sisa.jumlah  = js;
        this.tandaJadi.nilai = ntj;
        this.uangMuka.nilai = num;
        this.sisa.nilai = ns;
        return true;
    },
    process: function() {
       
        this.processInput();
        this.getData();
        
   
    },
    getFixDate:function(count,d){
   
        var m = parseInt(d[1]);
        var t = parseInt(d[2]);
        var mode = 'bulan';
        var total = m + count;
        var fm = 0;
        if(mode==='bulan'){
            var sisa = total%12;

            if(sisa==0){
                fm = 12;
            }else{
                fm = sisa;
            }
            if( total > 12){
                if(sisa == 0){
                    t= (t+parseInt(total/12))-1;
                }else{
                    t= t+parseInt(total/12);
                }
                
            }
        }
 
        return fm+'/'+d[0]+'/'+t;
    },
    localPT:{1:{p:'SIP'},2:{p:'KPR'},3:{p:'INH'},4:{p:'TJ'},5:{p:'UM'}},
    getData: function() {

        var newAr = [];
        var i = 0;
        var jum = this.getJumlahUangMuka();
        var js = this.getJumlahSisa();
        var jtj = this.getJumlahTandaJadi();
    
        
        var tj = this.getTandaJadi() / jtj;
        var um = 0;
        um = jtj > 0 ? this.getUangMuka() - this.getTandaJadi() : this.getUangMuka();
        um = um / jum;
        var s = this.getSisa() / js;
 
        var spd = this.spDate;
        var localPT = this.localPT;
        var tpName = localPT[this.typePrice].p;
        var countCicilan = 0;
        var bulanCicilan = spd[1];
        for (i = 0; i < jtj; i++) {
            countCicilan += i;
            newAr.push(this.fillAr(this.getFixDate(countCicilan,spd), 'TJ', (i + 1), tj, '', '', '', '',4));
        }
        if (this.getUangMuka() - this.getTandaJadi() > 0){
            
            for (i = 0; i < jum; i++) {
                countCicilan++;
                newAr.push(this.fillAr(this.getFixDate(countCicilan,spd), 'UM', (i + 1), um, '', '', '', '',5));
            }
        }

        for (i = 0; i < js; i++) {
            countCicilan++;
            newAr.push(this.fillAr(this.getFixDate(countCicilan,spd), tpName, (i + 1), s, '', '', '', '',this.typePrice));
        }

        this.dataGrid = newAr;

    },
    fillAr: function(tgl, type, ke, receive, rest, interest, interestrest, recom,typeId) {
        var o = {
            schedule_id:0,
            duedate: tgl,
            scheduletype: type,
            queue: ke,
            amount: receive,
            remaining_interest: rest,
            interset: interest,
           // interestrest: interestrest,
            recomendationdate: recom,
            sourcemoney:'CUSTOMER',
            scheduletype_id:typeId,
            sourcemoney_id:1,
            intersetflag:'',
            purchaseletter_id:0,
            remaining_balance:receive,
            termin:ke,
            description:''
        };

        return o;
    },
    getDataFormula: function() {
        var f = this.form;
      
        f.down('[name='+this.fields.j_tanda_jadi+']').setValue(this.tandaJadi.jumlah);
        f.down('[name='+this.fields.j_uang_muka+']').setValue(this.uangMuka.jumlah);
        f.down('[name='+this.fields.j_sisa+']').setValue(this.sisa.jumlah);
        f.down('[name='+this.fields.n_tanda_jadi+']').setValue(this.tandaJadi.nilai);
        f.down('[name='+this.fields.n_uang_muka+']').setValue(this.uangMuka.nilai);
        f.down('[name='+this.fields.n_sisa+']').setValue(this.sisa.nilai);
    },
    reset: function() {
        this.tandaJadi.nilai = 0;
        this.uangMuka.nilai = 0;
        this.sisa.nilai = 0;
        this.tandaJadi.persen = 0;
        this.uangMuka.persen = 0;
        this.tandaJadi.jumlah = 0;
        this.uangMuka.jumlah = 0;
        this.sisa.jumlah = 0;
    },
           
    setValFromCombobox: function(u) {
        this.valFromCombobox = u;
    },
    getDataGrid: function() {
        return this.dataGrid;
    },
    setUangMuka: function(n) {
        this.uangMuka.nilai = toFloat(n);
    },
    setTandaJadi: function(n) {
        this.tandaJadi.nilai = toFloat(n);
    },
    getUangMuka: function() {

        return this.uangMuka.nilai;
    },
    getTandaJadi: function() {
        return this.tandaJadi.nilai;
    },
    getSisa: function() {
        return this.sisa.nilai;
    },
    getJumlahUangMuka: function() {
        return this.uangMuka.jumlah;
    },
    getJumlahSisa: function() {
        return this.sisa.jumlah;
    },
    getJumlahTandaJadi: function() {
        return this.tandaJadi.jumlah;
    },
    setJumlahUangMuka: function(j) {
        this.uangMuka.jumlah = toFloat(j);
    },
    setJumlahTandaJadi: function(j) {
        this.tandaJadi.jumlah = toFloat(j);
    },
    setJumlahSisa: function(j) {
        this.sisa.jumlah = toFloat(j);
    },
    setPersenTandaJadi: function(p) {
        this.tandaJadi.persen = p;
    },
    setPersenUangMuka: function(p) {
        this.uangMuka.persen = p;
    }




});

