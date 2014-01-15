$(document).ready(function(){
	
	$('#trash').droppable({
		accept: '.items',
		hoverClass: "ui-state-hover",
		drop: function(event, ui){
			ui.draggable.remove();
		}		
	});

    $('#removeSelected').click(function(){
        if($('.items input').is(':checked')){
            $('.items input:checked').parent().remove();
        }
    });
    
	$('#sorting input').click(function(){
		$(this).prop('check',true);
	});
	
	$('#addToList').submit(function(event){
		
		if($('#textBox').val() != ''){
			
			AddListItem();
			
			$('.items').draggable({
				revert: true
			});
		}
		else{
			alert("Please enter shopping list item value");
		}
		
		event.preventDefault();
		
		$('#textBox').val('');
	});
	
	$("#itemList").delegate('.name', // The child element to bind to
                               'dblclick', // The event we want to bind
                               function() { // The handler
            
            $('.itemEditBox').hide();
                                
           //erase previously inputted name for list
            $(this).text('');
            
            //target the next element which is the hidden text input box show and change its margin
            $(this).next().toggle();
            $(this).next().css({'margin-left':'-30px'});
            
            //on keypress = 'enter', the previous node (class='name') becomes the input value and hide text input felement
            $(this).next().keypress(function(e){
                if(e.which == 13){
                    $(this).prev().text($(this).val());
                    $(this).hide();
                }
            });
            
            //when input field is not in focus, the previous node (class='name') becomes the input value and hide text input felement
            $(this).next().blur(function(){
                $(this).prev().text($(this).val());
                $(this).hide();
            });
    });
	
	function AddListItem(){
		
		var isPriority;
		var itemName = $('#textBox').val();
		var date = new Date(event.timeStamp);
		var options = {
    		weekday: "long", year: "numeric", month: "short",
    		day: "numeric", hour: "2-digit", minute: "2-digit"
		};
		
		if($('#prioritySelect').is(':checked')){
			isPriority = 'YES';
		}
		else{
			isPriority = 'NO';
		}
		
		$('#itemList').append('<ul class="items">'+
    							    '<input type="checkbox">'+
    							    '<li class="name">'+ itemName + '</li>'+
    							    '<input class="itemEditBox" style="display:none;"></input>'+
    							    '<li class="priority">Priority: '+ isPriority + '</li>'+
    							    '<li class="dateCreated">Created: '+ date.toLocaleTimeString("en-us", options) +'</li>'+
    							    '</ul>');
	}
	
	$('#sortButton').click(function(){
		
		var sortOrder = $('#sortOrder option:selected').text();
		
		if($('#alpha').prop('checked')){
			SortByAlpha(sortOrder);
		}
		else if($('#priority').prop('checked')){
			SortByPriority(sortOrder);
		}
		else if($('#timeCreated').prop('checked')){
			SortByTime(sortOrder);
		}
		else{
			alert("No criteria button was cheked");
		}
	});
	
	function SortByAlpha(ordering){
		
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[1].innerHTML.toLowerCase() > $(b).context.children[1].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){;
	    		return $(a).context.children[1].innerHTML.toLowerCase() < $(b).context.children[1].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
	function SortByPriority(ordering){
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[2].innerHTML.toLowerCase() > $(b).context.children[2].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[2].innerHTML.toLowerCase() < $(b).context.children[2].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
	function SortByTime(ordering){
		if(ordering == 'Ascending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[3].innerHTML.toLowerCase() > $(b).context.children[3].innerHTML.toLowerCase();
			}).appendTo('#itemList');  
		}
		else if(ordering == 'Descending'){
			$('#itemList ul').sort(function(a,b){  
	    		return $(a).context.children[3].innerHTML.toLowerCase() < $(b).context.children[3].innerHTML.toLowerCase();
			}).appendTo('#itemList'); 
		}
	}
	
});