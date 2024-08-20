<?php

/**
 * Description of Default
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitralandPalembang {
    
    public function getHTML() {
        return "";
    }
    
    public function getListTagihanHTML($params){
        return "";
    }
    
    public function getHTMLdefault() {
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
			</style>
			<p class="spstyle_p" align="right">{{PRINTOUT_SPPJB_PT_LOKASI}}, <b>{{tanggal_print}}</b></p>
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
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di {{PROJECT_NAME} {{PRINTOUT_SPPJB_PT_LOKASI}}. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
			<br/>
			{{{list_tagihan}}}
			<br/>
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran {{PROJECT_NAME}} atau dengan mentransfer ke rekening :<br/>
			<br/>
			<b>
			{{RPT_INVOICE_ATASNAMA}} <br/>
			{{RPT_INVOICE_NAMABANK}} {{RPT_INVOICE_NOREK}}<br/> 
			</b>
			{{RPT_INVOICE_ALMTBANK}}<br/>

			<i>atau</i> <br/>
			<b>BANK BCA A/C 021-333-9092</b><br/>
			Jl. Demang lebar daun no. 10<br/><br/>

			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat difax ke no. {{RPT_INVOICE_FAX}} dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			<br/><br/>
			Hormat Kami,</br>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			{{PURCHASELETTER_PRINTOUT_FINANCESIGNNAME}} (Financial Controller)<br/>
			--------------------------------------<br/>
			cc : {{PURCHASELETTER_PRINTOUT_MARKETINGSIGNNAME}} (Sales Coordinator)<br/>
			{{salesman_name}} (Sales)<br/>
			</p>

			<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>

        ';
    }
    
}
