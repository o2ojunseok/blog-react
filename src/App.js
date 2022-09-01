import './App.css'; // css 경로
import { useState } from 'react';
// JSX 문법
// 1. class => className
// 2. 데이터 바인딩은 중괄호 
// 3. style 넣을땐 style={ { } }


function App() {

  // let post = 'My Diary'
  
  // < state > / 사용이유 -> state 쓰던 html은 자동으로 재렌더링이 된다. 즉 state는 변경시 자동으로 html에 반영되게 하고 싶을때 쓴다. 
  // 1. import useState
  // 2. useState('보관할 자료')
  // 3. let [작명1, 작명2] 작명1 = 보관된 자료 , 작명2 = state 변경을 도와주는 함수 
  // state 변경하려면 변경할 함수 사용해야 한다.

  // < state 변경함수 특징 >
  // 기존 state === 신규 state 면 변경해주지 않음.
  // array/object는 RAM이란 공간에 저장이 되어있고 변수에는 어디에 있는지만 알려주는거.. 즉, 독립적 카피본을 만들어줘야한다. (reference date type에 대해 깊게 공부)

  let [title, setTitle] = useState([])
  let [content, setContent] = useState([])
  let [like, setLike] = useState([])
  let [modal, setModal] = useState(false);
  let [titles, setTitles]  = useState(0);
  let [contents, setContents] = useState(0);
  let [write, setWrite] = useState('');
  let [writes, setWrites] = useState('');
  // function
  // function likeUp() {
  //   { likePlus(like + 1)  }
  // }

  // function sort() {
  //   let titleCopy = [...title];
  //   titleCopy.sort();
  //   setTitle(titleCopy)
  // }


  return (
    <div className="App">
      <div className='black-nav'>
        <h4 style={ { fontSize:'20px'}}>Blog</h4>
      </div>

      {/* <button onClick={ () => {
        let titleCopy = [...title];     // Array, Object는 원본은 최대한 건들지 않는게 좋음. 
        titleCopy[2] = 'Python'
        setTitle(titleCopy)
        } }>Edit</button> */}

      <button onClick={ () => { 
        let titleCopy = [...title]
        titleCopy.sort();
        setTitle(titleCopy)
      } }>title sort</button>

      <button onClick={ () => {
        let titleCopy = [...title]
        titleCopy.sort( (a, b) => b.length - a.length);
        setTitle(titleCopy);
      } }>dec</button>

      {/* <div className='list'>
        <h4>{ title[0] } <span onClick={ likeUp }>👍</span> { like }</h4>
        <p>d</p>
      </div>
      <div className='list'>
        <h4 onClick={() => { setModal(!modal)}}>{ title[1] }</h4>
        { 
         modal === true ? <Modal></Modal> : null
        }   
        <p>date</p>
      </div>
      <div className='list'> 
        <h4>{ title[2] }</h4>
        <p>date</p>
      </div> */}

      <div>
      {
        title.map( (data, i) => 
          <div className='list' key={ i }>
            
            <h4 onClick={() => { 
              setModal(true); setTitles(i); setContents(i);
              }} >{ title[i] }

             <span onClick={ (e) => {
              let likeCopy = [...like];
              likeCopy[i] =likeCopy[i] + 1;
              e.stopPropagation(); setLike(likeCopy)
              // e.~ 이벤트 버블링 막는것
            }}>👍</span> { like[i] }</h4>


            <p>{ content[i] }</p>

            

            <button onClick={() => {
              let copy = [...title]
              copy.splice(i, 1);
              setTitle(copy);
              
              let copy1 = [...content];
              copy1.splice(i, 1);
              setContent(copy1)
              
            }}>delete!</button>
            
          </div>)
          
      }

      {         
        modal === true ? <Modal titles = { titles } title = { title }  content = { content }  contents = { contents }  /> : null
      }   
      </div>

      <p>title</p>
      <input onChange={(e) => { 
        setWrite(e.target.value)
        }} style={{ margin: 'auto' }}></input>

      <br></br>
      
      <p>content</p>
      <textarea onChange={ (e) => {
        setWrites(e.target.value)
      }} style={{ padding: '30px' }}></textarea>
   

      <br></br>
     <button onClick={() => {
        let copy = [...title];
        copy.push(write);
        setTitle(copy);

        let copy1 = [...content];
        copy1.push(writes);
        setContent(copy1)
        
        let likes = 0;
        like.push(likes);
        setLike(like);

      }}>post!</button>

      

      {/* props 하는법
      1. <하위컴포넌트 작명 = {state이름}
      2. parameter 작명 (보통 props라고 함)
       props는 상위에서 하위컴포넌트에게만 전송 가능하다*/}

      {/* <Modal></Modal> */}

      {/* {
         //html 중간에 조건문 쓰려면 삼항연산자 사용
         modal === true ? <Modal/> : null
      }       */}

      {/* 컴포넌트 만드는법
      1. function 만들기 -> html 밖에다
      2. return() 안에 html 담기
      3. <함수명></함수명> 사용 */}
      {/* <div className='modal'>
        <h4>title</h4>
        <p>content</p>
        <p>date</p>
      </div> */}

      {/* 컴포넌트 만들기 좋은 경우
      1. 반복적 html을 축약할 때
      2. 큰 페이지들
      3. 자주 변경되는 UI들 */}
      {/* 주의
      state 가져다 쓸 때 문제 */}
    </div>
  );

  // modal return () 안에는 하나의 태그만 가능
  function Modal(props) {
    return (
      // <> -> 하나의 태그로 인식 
    <>  
      <div className='modal'>
        <h4>{ props.title[props.titles] }</h4>
        <p>{ props.content[props.contents] }</p>
        {/* <button onClick={() => {
          props.setTitle(['Rust', 'Python', 'PHP'])
        }}>edit</button> */}
      </div> 
    </>
    )
  }


  // 동적인 UI 만드는 법 
  // 1. html css 로 미리 디자인을 완성해준다.
  // 2. UI 현재 상태를 state로 저장한다.
  // 3. state 에 따라서 UI가 어떻게 보일지 작성한다. 
}

export default App;
