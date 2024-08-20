<?php

/**
 * Description of CitralandKendari
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Suratperingatan_CitralandKendari {
    
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
			</style>
			<p class="spstyle_p" align="right">Kendari, <b>{{tanggal_print}}</b></p>
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
			<text class="amiddle">
			<p class="spstyle_p">Dengan Hormat,<br/>
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di {{PROJECT_NAME}}. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
			</text>    
			<br/>
                {{{list_tagihan}}}
			<br/>
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran {{PROJECT_NAME}} atau dengan mentransfer ke rekening :<br/>
			<br/>
			<b>
			PT. CIPUTRA ABDI PERSADA<br/>
                        BCA   KENDARI<br/>
                        NO.REKENING 791 043 7288<br/><br/>
                        </b>
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat kirim email ke: citralandkendari@ciputra.com dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			<br/><br/>
			Hormat Kami,</br>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			DEMAS DENISSON SAKSONY (Financial Controller)<br/>
			--------------------------------------<br/>
			cc : DANIAT R.A.Y PUTRA (Sales Coordinator)<br/>
			{{salesman_name}} (Sales)<br/>
			</p>

			<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>

        ';
    }
    
    public function getListTagihanHTML($params){
        return "";
		
    }
    
    public function getHTMLdefault() {
        return '';
    }

    public function getHTMLSp4(){
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
			<p class="spstyle_p" align="right">Kendari, <b>{{tanggal_print}}</b></p>
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
			<text class="amiddle">
			<p class="spstyle_p">Dengan Hormat,<br/>
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di {{PROJECT_NAME}}. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
			</text>    
			<br/>
			{{{list_tagihan}}}
			<br/>
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran {{PROJECT_NAME}} atau dengan mentransfer ke rekening :<br/>
			<br/>
			<b>
			PT. CIPUTRA ABDI PERSADA<br/>
                        BCA   KENDARI<br/>
                        NO.REKENING 791 043 7288<br/><br/>
                        </b>
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat kirim email ke: citralandkendari@ciputra.com dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
                        Perlu diperhatikan bahwa ini adalah <b>surat peringatan terakhir</b> sebelum dinyatakan <b>batal</b>. <br/>
                        Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			<br/><br/>
			Hormat Kami,</br>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			ANDRI YUNIANTO (Financial Controller)<br/>
			--------------------------------------<br/>
			cc : DANIAT R.A.Y PUTRA (Sales Coordinator)<br/>
			{{salesman_name}} (Sales)<br/>
			</p>

			<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>

        ';
    }
	
	public function getHTML_old() {
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
			<p class="spstyle_p" align="right">Kendari, <b>{{tanggal_print}}</b></p>
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
			<text class="amiddle">
			<p class="spstyle_p">Dengan Hormat,<br/>
			    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di {{PROJECT_NAME}} {{PRINTOUT_SPPJB_PT_LOKASI}}. Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
			</text>    
			<br/>
                {{{list_tagihan}}}
			<br/>
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat datang langsung ke Kantor Pemasaran {{PROJECT_NAME}} atau dengan mentransfer ke rekening :<br/>
			<br/>
			<b>
			PT. CIPUTRA ABDI PERSADA<br/>
                        BCA   KENDARI<br/>
                        NO.REKENING 791 043 7288<br/><br/>
                        </b>
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat kirim email ke: citralandkendari@ciputra.com dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag.Collection).<br/>
			Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
			<br/><br/>
			Hormat Kami,</br>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
			DEMAS DENISSON SAKSONY (Financial Controller)<br/>
			--------------------------------------<br/>
			cc : DANIAT R.A.Y PUTRA (Sales Coordinator)<br/>
			{{salesman_name}} (Sales)<br/>
			</p>

			<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>

        ';
    }
    
}
