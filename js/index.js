if(!Putao)
	var Putao = {};
if(!Putao.Index) {
	Putao.Index = {};
}

Putao.Index = function() {
	this.time = null;
	this.init();
	this.bindEvent();
}
Putao.Index.prototype = {
		init: function() {
			var self = this;
		},
		bindEvent: function() {
			var self = this;
			//控制音乐播放停止和音乐ico图标变换

			$("#audioPlay").on('click', function() {
				if(audio.paused) {
					audio.play();
					this.style.backgroundImage = "url(img/mu_on.png)";
				} else {
					audio.pause();
					this.style.backgroundImage = "url(img/mu_off.png)";
				}
			});

			//二维码
			$('#code').click(function() {
				$(this).animate({
					bottom: '463px',
					right: '526px'
				}, 1500, 'swing', function() {
					$('#main').removeClass('b fadeIn animated');
					$('#ready_main').show();
					$('#gift').hide();
					$('#timer').hide();
					$('#pic_code').show();
					$('#winer').hide();
					$('#ready').show();
					clearInterval(self.time);
					self.time = null;
					$('#ready').removeClass('btn_Replay');
					$(this).hide();
				});

			});

			//倒计时开始
			$('#ready').click(function() {
				self._cleanWiner();
				$('#ready_main').show();
				$('#winer').hide();
				$('#timer').css('backgroundImage', "url(img/num/8.png)");
				$('#gift').hide();
				$('#pic_code').hide();
				$('#code').hide();
				$('#code_static').show();
				$('#timer').show();
				$(this).hide();
				self.timer();
			});
			//倒计时开始
			$('#replay').click(function() {
				$('#ready').click();
			});
		},
		timer: function() {
			var self = this;
			var num = 8;
			self.time = setInterval(function() {
				num--;
				if(num == 0) {
					clearInterval(self.time);
					self.playPause();
				} else {
					$('#timer').css('backgroundImage', "url(img/num/" + num + ".png)");
				}
			}, 1000);
		},
		playPause: function() {
			var self = this;
			self._play();
			self._pause();
		},
		//摇一摇开始
		_play: function() {
			var self = this;
			$('#ready_main').hide();
			$('#winer').hide();
			$('#code_static').hide();
			$('#video_content').show();
			$('#video').trigger('play');
			$('#audioPlay').hide();audio.pause();
			// self.setGamePlay(true); //游戏开始
//			self.start();
		},
		//摇一摇结束
		_pause: function() {
			var self = this;
			$('#video').bind('ended', function() {
				// self.setGamePlay(false); //游戏结束
//				self.close();
				$('#video_content').hide();
				$('#ready_main').hide();
				$('#code_static').show();
				$('#main').addClass('b fadeIn animated');
				$('#replay').hide();
				$('#winer').show();
				$('#audioPlay').show();audio.play();
				$('#userList').delay(1000).animate({
					bottom: '420px'
				}, 1000, 'swing', function() {
					//此处处理头像反过来
					var userList = self.getUserList();
					self.winner(userList);
				});
			});
		},
		//通知手机端游戏开始或结束
		start: function(){
			$.ajax({
				url: '/conference/sstatus',
				type: 'GET',
				dataType: 'json',
				cache: false,
				async: false,
				success: function (data) {
				}
			})
		},
		close: function(){
			$.ajax({
				url: '/conference/cstatus',
				type: 'GET',
				dataType: 'json',
				cache: false,
				async: false,
				success: function (data) {
				}
			})
		},
		//获取中奖者名单数据
		winner: function(userList) {
			var $headimgurl = [];
			var $nickname = [];
			var $backList = [];
			var $fontList = [];
			$('#userList li').each(function(index, data) {
				var $back = $(this).find('.back');
				var $font = $(this).find('.font');
				var $img = $(this).find('.back img');
				var $name = $(this).find('.back .name');
				$headimgurl.push($img);
				$nickname.push($name);
				$backList.push($back);
				$fontList.push($font);
			});

			if(userList.length > 0) {
				for(var i = 0; i < userList.length; i++) {
					var delay = i - (i - 1 + 0.5) + 0.2 * (i - 1);
					$headimgurl[i].attr('src', userList[i].headimgurl);
					$nickname[i].text(userList[i].nickname);
					$fontList[i].css('transition-delay', delay + 's');
					$backList[i].css('transition-delay', delay + 's');
					$fontList[i].removeClass('font').addClass('an_font');
					$backList[i].removeClass('back').addClass('an_back');

				}
				$backList[userList.length - 1].on('transitionend', function() {
					$('#replay').show();
				});
			}
		},
		//清空上一次的数据
		_cleanWiner: function() {
			var self = this;
			$('#userList').css('bottom', '-10px');
			$('#userList li').each(function(index, data) {
				$(this).find('.an_back').removeClass('an_back').addClass('back');
				$(this).find('.an_font').removeClass('an_font').addClass('font');
				$(this).find('.back img').attr('src', "");
				$(this).find('.back .name').text("");
			});
//			$.ajax({
//				url: '/conference/clear',
//				// data: status,
//				type: 'POST',
//				dataType: 'json',
//				processData: false,
//				contentType: false,
//				cache: false,
//				async: false,
//				success: function (data) {
//				}
//			});
		},
		//获取获奖者名单
		getUserList: function() {
			var userList = [];
			userList = [{
				nickname: '夏日的凉风',
				headimgurl: 'img/33.jpg'
			}, {
				nickname: 'test2',
				headimgurl: 'img/22.png'
			}, {
				nickname: 'test3',
				headimgurl: 'img/11.png'
			}, {
				nickname: 'test4',
				headimgurl: 'img/33.jpg'
			}, {
				nickname: 'test5',
				headimgurl: 'img/11.png'
			}];
//			$.ajax({
//				url: '/conference/rank',
//				// data: formdata,
//				type: 'POST',
//				dataType:'json',
//				processData: false,
//				contentType: false,
//				cache:false,
//				async:false,
//				success: function(data){
//
//					if(data.httpStatusCode = 200) {
//						userList = data.data;
//					}
//
//				},
//			});
			return userList;
		}
	}
	//the end