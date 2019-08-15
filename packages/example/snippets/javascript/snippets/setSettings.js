index.setSettings({ customRanking: ['desc(followers)'] }, (err, content) => {
  if (err) throw err;

  console.log(content);
});
