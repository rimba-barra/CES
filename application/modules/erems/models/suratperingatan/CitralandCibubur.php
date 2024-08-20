<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of CitralandCibubur
 *
 * @author DAVID-MIS
 */
class Erems_Models_Suratperingatan_CitralandCibubur extends Erems_Models_Suratperingatan_Default {
    public function getHTML_old(){
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
                        font-size: 9px;
                    
                    }
                </style>
                <p class="spstyle_p" align="right">Cibubur, <b>{{tanggal_print}}</b></p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No 	: <b>{{nomor_sp_teratas}}</b><br/>
                    Hal	: Pemberitahuan ke <b>{{sp_surat_ke}}</b></p>
				<br/>
                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>
				<br/>
                <p class="spstyle_p">Dengan Hormat,<br/>
                    Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di Citraland Cibubur Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:<br/>
                <br/>
                {{{list_tagihan}}}
                <br/>
                Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat dilakukan dengan mentransfer ke VA (Virtual Account) :<br/>
				<table style="border: none;">
				<tbody>
				<tr style="border: none;">
				<td style="border:none;" width: "170px;" align="left" valign="top">Nomor</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">&nbsp;{{customer_name}}</td>
				</tr>
				<tr style="border: none;">
				<td style="border:none;"width: "170px;" align="left" valign="top">Nomor VA BCA</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">{{va_bca}}</td>
				</tr>
				<tr style="border: none;">
				<td style="border:none;" width: "170px;" align="left" valign="top">Nomor VA Mandiri</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">{{va_mandiri}}</td>
				</tr>
				</tbody>
				</table>																																									
				<br/>
				<br/>
                
                <!--<b>BANK MANDIRI</b><br/>
                CABANG JAKARTA BERDHARMA<br/>
                AC. 122-000-7559-779<br/>
                A.N. PT. PANASIA GRIYA MEKARASRI<br/>
                 <br/>
                <b>BANK BCA</b><br/>
                CABANG MARGONDA DEPOK<br/>
                AC. 869-101-8989<br/>
                A.N. PT. PANASIA GRIYA MEKARASRI<br/><br/>-->



                Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat di WhatsApp-kan ke No. 0812-9596-9080 atau email ke coll.clcibubur@ciputra.co.id dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag. Collection).<br/>
                Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
                <br/><br/>
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                Agustina Hanny (Financial Controller)<br/>
                --------------------------------------------------<br/>
                <!--
                cc : Sofyan Khabib (Sales Coordinator)<br/>
                {{salesman_name}} (Sales)<br/>
                -->
                </p>

                <p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>


                ';
    }
	public function getHTML($spke=null){

        $tpl1=
        '<style>
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
                body{
                    font-family: "Comic Sans MS", "Comic Sans", cursive;
                }
                p.spstyle_p, div {
                    font-size: 12px;
                }
                p.spstyle_p_small{
                    font-size: 10px;
                
                }
                .amiddle{
                    text-align: justify;
                    text-justify: inter-word;
                }
                </style>
                <body>
                <p class="spstyle_p" align="right">Cibubur, <b>{{tanggal_print}}</b></p>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <p class="spstyle_p">No 	: <b>{{nomor_sp_teratas}}</b><br/>
                    Hal	: Pemberitahuan ke <b>{{sp_surat_ke}}</b></p>
				<br/>
                <p class="spstyle_p" style="width: 310px;">Kepada Yth, <br/>
                    Bapak/Ibu <b>{{customer_name}}</b><br/>
                    {{customer_address}}</p>
				<br/>
                <p class="spstyle_p">Dengan Hormat,<br/>
                <div class="amiddle">';
            
            $tpl2 = 
                'Pertama-tama kami mengucapkan terima kasih atas kepercayaan Bapak/Ibu terhadap produk kami, dengan pemesanan rumah/kavling  <b>{{unit_number}}</b> di Citraland Cibubur Dengan tidak bermaksud mengganggu kesibukan Bapak/Ibu, kami ingin memberitahukan tentang angsuran yang telah jatuh tempo berikut:
                        </p>        
                        <br/>';
						
			$tpl3 ='Menindaklanjuti transaksi pembelian Bapak/Ibu {{customer_name}} di Perumahan Citraland Cibubur type {{unit_type}} unit {{unit_number}} yang sampai sekarang belum kami terima pembayarannya, dimana sudah kami informasikan nilai tagihan tersebut melalui Surat Pemberitahuan No {{sp1}}, No {{sp2}}dan No {{sp3}} sesuai PPJB pasal VII - point Pembatalan maka, dengan sangat menyesal kami <b>membatalkan secara sepihak</b> pembelian rumah CitraLand Cibubur type {{unit_type}} unit {{unit_number}}.<br/>
			';
			
			$tpl4 ='<br/>
			{{{list_tagihan}}}
                        <br/> ';
			
			$tpl5 ='
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat dilakukan dengan mentransfer ke rekening:<br/>
						<b>BANK MANDIRI</b> <br/>
						CABANG JAKARTA BERDHARMA <br/>
						AC. 122-000-7559-779<br/>
						A.N PT. PANASIA GRIYA MEKARASRI<br/>
						<br/>
                        <b>BANK BCA</b> <br/>
						CABANG MARGONDA DEPOK <br/>
						AC. 869-101-8989<br/>
						A.N PT. PANASIA GRIYA MEKARASRI<br/>
                        ';
			
			$tpl6 ='
			Sampai saat ini kami belum menerima pembayarannya. Kami mohon agar Bapak/Ibu dapat melunasi pembayaran tersebut. Adapun pembayarannya dapat dilakukan dengan mentransfer ke VA (Virtual Account) :<br/>
				<table style="border: none;">
				<tbody>
				<tr style="border: none;">
				<td style="border:none;" width: "170px;" align="left" valign="top">Nomor</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">&nbsp;{{customer_name}}</td>
				</tr>
				<tr style="border: none;">
				<td style="border:none;"width: "170px;" align="left" valign="top">Nomor VA BCA</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">{{va_bca}}</td>
				</tr>
				<tr style="border: none;">
				<td style="border:none;" width: "170px;" align="left" valign="top">Nomor VA Mandiri</td>
				<td style="border:none;" "width: 10px; text-align: center;">&nbsp;:</td>
				<td style="border:none;" "width: 558px;" align="left">{{va_mandiri}}</td>
				</tr>
				</tbody>
				</table>																																									
				<br/>';
			
			$tpl7 ='<p class="spstyle_p">
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat difax ke No. 021-29232812, atau di WhatsApp-kan ke No. 0812-9596-9080 atau email ke coll.clcibubur@ciputra.co.id dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag. Collection).<br/>
            Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/>
                 ';
			
			$tpl8 = '<p class="spstyle_p">
			Akan tetapi jika Bapak/Ibu telah menyelesaikan kewajiban tersebut, kami mohon bukti pembayarannya dapat di WhatsApp-kan ke No. 0812-9596-9080 atau email ke coll.clcibubur@ciputra.co.id dan pemberitahuan ini dapat diabaikan, untuk informasi hubungi staff kami (Bag. Collection).<br/>
            Atas perhatian dan kerjasama Bapak/Ibu, kami ucapkan terima kasih.<br/> ';
			
            $tpl9 = 'Demikian surat ini kami sampaikan. Atas perhatiannya kami sampaikan terima kasih.<br/>'; 

            $tpl10 .= '</div>
                <br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                Agustina Hanny - Finance Controller<br/>
				--------------------------------------<br/>
				<p class="spstyle_p_small"><u>*Denda diatas, adalah nilai denda sementara sampai dengan saat Surat Peringatan dicetak, hari keterlambatan akan dihitung ulang saat pembayaran dilakukan</u></p>
                </body>
                ';
				
			 $tpl11 .= '</div>
                <br/>
                <p class="spstyle_p">
                Hormat Kami,</br>
                <br/>
                <br/>
                <br/>
                Agustina Hanny - Finance Controller<br/>
				--------------------------------------<br/>
                </body>
                ';
        if($spke==1){
            $tpl = $tpl1.$tpl2.$tpl4.$tpl5.$tpl7.$tpl10;
        }
        elseif($spke==2){
            $tpl = $tpl1.$tpl2.$tpl4.$tpl6.$tpl7.$tpl10;
        }
        elseif($spke==3){
            $tpl = $tpl1.$tpl2.$tpl4.$tpl6.$tpl8.$tpl10;
        }
        elseif($spke==4){
            $tpl = $tpl1.$tpl3.$tpl9.$tpl11;
        }else{
            $tpl = $tpl1.$tpl2.$tpl4.$tpl5.$tpl7.$tpl10;
        }
        
        return $tpl;
    }
}
