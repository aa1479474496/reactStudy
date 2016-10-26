// 表格头部组件
 class StaffHeader extends React.Component{
    render(){
        return (
          <div>
              <h3 style={{'textAlign':'center'}}>人员管理系统</h3>
              <table className="optHeader">
                <tbody>
                  <tr>
                    <td className="headerTd"><input type='text' placeholder='Search...' /></td>
                    <td className="headerTd">
                        <label htmlFor='idSelect'>人员筛选</label>
                        <select id='idSelect'>
                            <option value='0'>全部</option>
                            <option value='1'>主任</option>
                            <option value='2'>老师</option>
                            <option value='3'>学生</option>
                            <option value='4'>实习</option>
                        </select>
                    </td>
                    <td>
                        <label htmlFor='orderSelect'>排列方式</label>
                        <select id='orderSelect'>
                            <option value='0'>身份</option>
                            <option value='1'>年龄升</option>
                            <option value='2'>年龄降</option>
                        </select>
                    </td>
                  </tr>
                </tbody>
              </table>
          </div>
        );
    }
}

// 每个具体人员的基本信息组件
class StaffItem extends React.Component{
	 constructor() {
          super();
         
          this.handleClick = this.handleClick.bind(this);
        }
	handleClick(){
		alert(this.key);
	}
    render(){
        return (
              <tr style={{'cursor': 'pointer'}} >
                <td className='itemTd'>{this.props.item.info.name}</td>
                <td className='itemTd'>{this.props.item.info.age}</td>
                <td className='itemTd'>{this.props.item.info.id}</td>
                <td className='itemTd'>{this.props.item.info.sex}</td>
                <td className='itemTd'>
                    <a className="itemBtn" onClick={this.handleClick}>删除</a>
                    <a className="itemBtn">详情</a>
                </td>
              </tr>
        );
    }
}

// 展示由父组件传入的各个人员条目
class StaffItemPanel extends React.Component{
    render(){
        let items = [];

        if(this.props.items.length == 0) {
            items.push(<tr><th colSpan="5" className="tempEmpty">暂无用户</th></tr>);
        }else {
            this.props.items.forEach((item,key) => {
                items.push(<StaffItem key={key} item={item}/>);
            });
        }

        return (
          <table className='itemPanel'>
            <thead>
	            <tr>
	                <th className='itemTd'>姓名</th>
	                <th className='itemTd'>年龄</th>
	                <th className='itemTd'>身份</th>
	                <th className='itemTd'>性别</th>
	                <th className='itemTd'>操作</th>
	            </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        );
    }
}

// 添加新人员
class StaffFooter extends React.Component{

    render(){
        return (
          <div>
            <h4 style={{'textAlign':'center'}}>人员新增</h4>
            <hr/>
            <form ref='addForm' className="addForm">
                <div>
                  <label htmlFor='staffAddName' style={{'display': 'block'}}>姓名</label>
                  <input ref='addName' id='staffAddName' type='text' placeholder='Your Name'/>
                </div>
                <div>
                  <label htmlFor='staffAddAge' style={{'display': 'block'}}>年龄</label>
                  <input ref='addAge' id='staffAddAge' type='text' placeholder='Your Age(0-150)'/>
                </div>
                <div>
                  <label htmlFor='staffAddSex' style={{'display': 'block'}}>性别</label>
                  <select ref='addSex' id='staffAddSex'>
                    <option value='男'>男</option>
                    <option value='女'>女</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='staffAddId' style={{'display': 'block'}}>身份</label>
                  <select ref='addId' id='staffAddId'>
                    <option value='主任'>主任</option>
                    <option value='老师'>老师</option>
                    <option value='学生'>学生</option>
                    <option value='实习'>实习</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='staffAddDescrip' style={{'display': 'block'}}>个人描述</label>
                  <textarea ref='addDescrip' id='staffAddDescrip' type='text'></textarea>
                </div>
                <p ref="tips" className='tips' >提交成功</p>
                <p ref='tipsUnDone' className='tips'>请录入完整的人员信息</p>
                <p ref='tipsUnAge' className='tips'>请录入正确的年龄</p>
                <div>
                  <button>提交</button>
                </div>
            </form>
          </div>
        )
    }
}

// 用户点击某条目的详情
class StaffDetail extends React.Component{

    render(){
      let staffDetail = this.props.staffDetail;  
      if(!staffDetail)
        return null;

      return (
          <div className="overLay">
            <h4 style={{'textAlign':'center'}}>点击'完成'保存修改,点击'关闭'放弃未保存修改并退出.</h4>
            <hr/>
            <table ref="editTabel">
              <tbody>
                <tr>
                  <th>姓名</th>
                  <td><input id='staffEditName' type="text" defaultValue={staffDetail.info.name}></input></td>
                </tr>
                <tr>
                  <th>年龄</th>
                  <td><input id='staffEditAge' type="text" defaultValue={staffDetail.info.age}></input></td>
                </tr>
                <tr>
                  <th>性别</th>
                  <td>
                    <select ref='selSex' id='staffEditSex'>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>身份</th>
                  <td>
                    <select ref="selId" id='staffEditId'>
                      <option value="主任">主任</option>
                      <option value="老师">老师</option>
                      <option value="学生">学生</option>
                      <option value="实习">实习</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>个人描述</th>
                  <td><textarea id='staffEditDescrip' type="text" defaultValue={staffDetail.info.descrip}></textarea></td>
                </tr>
              </tbody>
            </table>
            <p ref='Dtips' className='tips'>修改成功</p>
            <p ref='DtipsUnDone' className='tips'>请录入完整的人员信息</p>
            <p ref='DtipsUnAge' className='tips'>请录入正确的年龄</p>
            <button>完成</button>
            <button>关闭</button>
          </div>
      );
    }
}

// 最外层的容器

var rawData = [{ info: {descrip:'我是一匹来自远方的狼。', sex: '男', age: 20, name: '张三', id: '主任'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '女', age: 21, name: '赵静', id: '学生'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '女', age: 22, name: '王二麻', id: '学生'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '女', age: 24, name: '李晓婷', id: '实习'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '男', age: 23, name: '张春田', id: '实习'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '男', age: 22, name: '刘建国', id: '学生'}},
               { info: {descrip:'我是一匹来自远方的狼。', sex: '男', age: 24, name: '张八', id: '主任'}},
               { info: {descrip:'我是一匹来自远方的狗。', sex: '男', age: 35, name: '李四', id: '老师'}},
               { info: {descrip:'我是一匹来自远方的猪。', sex: '男', age: 42, name: '王五', id: '学生'}},
               { info: {descrip:'我是一匹来自远方的牛。', sex: '男', age: 50, name: '赵六', id: '实习'}},
               { info: {descrip:'我是一匹来自远方的马。', sex: '男', age: 60, name: '孙七', id: '实习'}}];

class App extends React.Component {
    render(){
      return (
        <div>
          <StaffHeader/>
          <StaffItemPanel items={rawData} />
          <StaffFooter/>
          <StaffDetail/>
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));