<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input type="text" focus clearable v-model="username" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
           <view class="input-row">
                <text class="title">手机：</text>
                <m-input type="text" clearable v-model="phone" placeholder="请输入手机号"></m-input>
            </view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                username: '',
                password: '',
                phone: ''
            }
        },
        methods: {
            async register() {
				const {username,password,phone} = this;
                /**
                 * 客户端对账号信息进行一些必要的校验。
                 * 实际开发中，根据业务需要进行处理，这里仅做示例。
                 */
                if (username.length < 3) {
                    uni.showToast({
                        icon: 'none',
                        title: '账号最短为 5 个字符'
                    });
                    return;
                }
                if (password.length < 3) {
                    uni.showToast({
                        icon: 'none',
                        title: '密码最短为 6 个字符'
                    });
                    return;
                }
                if (phone.length < 3 || !/0?(13|14|15|17|18)[0-9]{9}/.test(phone)) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号码不合法'
                    });
                    return;
                }
				
                // service.addUser(data);
				await this.$http.post('api/users/register',{username,password,phone,email:`${username}@123.com`,enabled:true,userType:'DRIVER'},{auth:false})
                uni.showToast({
                    title: '注册成功'
                });
                // uni.navigateBack({
                //     delta: 1
                // });
				uni.navigateTo({
				    url: `/pages/login/login?username=${username}&password=${password}`
				});
            }
        }
    }
</script>

<style>

</style>
