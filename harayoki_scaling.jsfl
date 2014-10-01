_doc = fl.getDocumentDOM();

panel = _doc.xmlPanel( fl.configURI+"Commands/harayoki_scaling.xml");

if(panel.dismiss == "accept")
{
	var xx = panel.percentageX;
	var yy =panel.percentageY;
	if(yy=="")
	{
		yy = xx;
	}
	var error =transform(parseFloat(xx)/100,parseFloat(yy)/100,panel.method=="absolute");
	if(error)
	{
		alert("[エラー]\n"+error);
	}
}
else
{
	//fl.trace("canceled");
}

function transform( scaleX, scaleY, absolute ){

	fl.trace([scaleX, scaleY, absolute]);

	var selection = _doc.selection.concat();
	var len = selection.length;
	
	if(len==0)
	{
		return "選択されたインスタンスがありません";
	}
	
	try{
		for ( var i = 0; i < len; ++i ){
	
			var element = selection[ i ];
			//fl.trace(i+" "+element);
			element.scaleX = absolute ? scaleX : element.scaleX * scaleX;
			element.scaleY = absolute ? scaleY :element.scaleY * scaleY;
		}
	}
	catch(e)
	{
		return "Javascript エラーです。\n"+ unescape(e.message);
	}
	
	_doc.selection = selection;
	
	return "";
}

