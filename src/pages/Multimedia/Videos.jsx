import React from 'react'

const Videos = () => {
  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center mb-4 mt-3">Gallery Videos</h3>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="videos/kurnool.mp4" allowFullScreen title="YouTube video player"></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="videos/kurnool.mp4" allowFullScreen title="YouTube video player"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos

