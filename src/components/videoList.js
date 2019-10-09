import React from 'react';
import { useSelector } from 'react-redux';


export default function VideoList() {

  const videos = useSelector(state => state.videos);
  console.log(videos);

  return (
    <div>
      {
        videos.map((el, index) => {
          return (
            <div className="list-item">
              <img className="list-item__thumb" src={el.thumb}/>
              <div className="list-item__info">
                <div className="list-item__info__title">{el.title}</div>
                <div className="list-item__info__date">
                  <p className="list-item__info__date__date">Дата публикации: {el.date.toDateString()}</p>
                  <p className="list-item__info__date__time">Время публикации: {el.date.toTimeString()}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

