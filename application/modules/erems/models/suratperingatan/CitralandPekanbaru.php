<?php

/**
 * Description of CitralandPekanbaru
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitralandPekanbaru extends Erems_Models_Suratperingatan_Default{
    
    public function getHTML() {
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
                <p class="spstyle_p" align="right">Pekanbaru, <b>{{tanggal_print}}</b></p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                    Hal : Pemberitahuan ke <b>{{sp_surat_ke}}</b></p>

                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>

                <p class="spstyle_p">Dengan Hormat,<br/>
                    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di CitraLand Pekanbaru Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
                <br/>
                {{{list_tagihan}}}
                <br/>
                Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran CitraLand Pekanbaru atau dengan mentransfer ke rekening :<br/>
                <br/>
                
                PT. CIPUTRA SYMPHONY, Bank Mandiri Cab. Sudirman Bawah, A/c No. 108.00.111.51355 <br/>
                Jl. Jendral Sudirman<br/>
                <br/>
                atau ke rekening:<br/>
                <br/>
                PT. CIPUTRA SYMPHONY, BCA Cab.Sudirman Atas, A/c No. 034.194.8222<br/>
                Jl. Jendral Sudirman<br/>
                <br/>


                Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat difax ke no. 0761-868633 dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
                Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
                <br/><br/>
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Weini Tandiyanti (Financial Controller)<br/>
                --------------------------------------------------<br/>
    
                cc : Kevin Ramana (Sales Coordinator)<br/>
                {{salesman_name}} (Sales)<br/>
      
                </p>

                <p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>


                ';
    }
	
	public function getHTMLdefault(){
       return $this->getHTML();
    }
  
    
}
