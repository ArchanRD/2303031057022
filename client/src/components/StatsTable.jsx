import React from 'react';
function StatsTable({ data }) {
  return (
    <div className="stats-table">
      {data.map((item, index) => (
        <div className="url-card" key={index}>
          <div className="url-info">
            <p><strong>Short URL:</strong> <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">{item.shortUrl}</a></p>
            <p><strong>Original URL:</strong> {item.longUrl}</p>
            <p><strong>Created:</strong> {new Date(item.createdAt).toLocaleString()}</p>
            <p><strong>Expires:</strong> {new Date(item.expiresAt).toLocaleString()}</p>
            <p><strong>Clicks:</strong> {item.clicks.length}</p>
          </div>
          <div className="click-details">
            <p><strong>Click Details:</strong></p>
            <ul>
              {item.clicks.map((click, i) => (
                <li key={i}>
                  {new Date(click.timestamp).toLocaleString()} | Referrer: {click.referrer || 'N/A'} | Location: {click.location || 'N/A'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsTable;