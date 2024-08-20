<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitralandSurabayaUtara {
    
    public function getHTML() {
        return '
			<style>
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
                            .left{
                                float:left;
                                width:50%;
                            }
                            .right{
                                float:right;
                                width:50%;
                                text-align:right;
                            }
			</style>
			
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
                        <div class="left">
                        <p class="spstyle_p">No. Ref : <b>{{nomor_sp_teratas}}</b><br/>
                                        Hal : <b>{{sp_surat_header}}</b></p>
                    </div>
                    <div class="right">
                        <p class="spstyle_p" align="right">Surabaya, <b>{{tanggal_print}}</b></p>
                    </div>
			

			<p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
			    {{dataTagihan}}Bapak/Ibu <b>{{customer_name}}</b><br/>
			    {{customer_address}}</p></br>

			<p class="spstyle_p">Dengan Hormat,<br/>
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b>. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:
                        </p>        
                        <br/>
			<br/>
			{{{list_tagihan}}}
			{{{pageBreak3}}}   
			<br/>
                        <p class="spstyle_p">
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Marketing Citraland atau dengan mentransfer ke rekening :<br/>
			<br/>
						Northwest Central a/c. NO REK. 862-053-8800 BANK BCA
                        </p>
			<br/>
                        <p class="spstyle_p">
			Untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			<br/><br/>
			Hormat Kami,</br>
			<b>NORTHWEST</b>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			Dwi Yuni (HOD Finance)<br/>
			--------------------------------------<br/>
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
