<?php

/**
 * Description of Default
 *
 * @author David-MIS
 */
class Erems_Models_Suratperingatan_CitraWinagunManado {
	    public function getHTML(){
			$pt_name = $data['pt_name'];
			$pt_rekening = $data['pt_norek'];
			$pt_bank_name = $data['pt_bank_name'];
			$pt_cabang_name = $data['pt_cabang_name'];
			
			return '<style>
    table {
    border-collapse: collapse;
}



table, td, th {
    border: 1px solid black;
    font-size:12px;
}
td{
    padding:2px 10px;
}



    p.spstyle_p{
        font-size: 12px;
    }
    p.spstyle_p_small{
        font-size: 8px;
    
    }
</style>
<p class="spstyle_p" align="right">Manado, <b>{{tanggal_print}}</b></p>
<br/>
<br/>
<br/>
<br/>
<br/>
<p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
    Hal : MMB <!--Pemberitahuan ke <b>{{sp_surat_ke}}</b>--></p>

<p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
    Bapak/Ibu <b>{{customer_name}}</b><br/>
    {{customer_address}}</p>

<p class="spstyle_p">Dengan Hormat,<br/>
    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling <b>{{unit_number}}</b> di CitraLand Winagun Manado. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
<br/>
{{{list_tagihan}}}
<br/>
Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran Citraland Winagun Manado atau dengan mentransfer ke rekening :<br/>
<br/>
'.$pt_name.' {{pt_name}}<br/>
'.$pt_bank_name.' {{pt_bank_name}} Cab. '.$pt_cabang_name_name.' {{pt_cabang_name}} <br/>
No. '.$pt_rekening.' {{pt_norek}}<br/>
MANADO
<br/>
Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat dikirimkan di Whatsapp ke no. 082296223979 dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
            Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
<br/><br/>
Hormat Kami,</br>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
Aloysius Pangky (Financial Controller)<br/>
--------------------------------------<br/>
cc : Dewi Rompas (Manager Marketing)<br/>
{{salesman_name}} (Sales)<br/>
</p>

<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>



';
    }

    public function getListTagihanHTML($params){
        return "";
    }
    
    public function getHTMLdefault(){
       return $this->getHTML();
    }
    
}
