string='Elon Musk'
#request_sentiment='positive'
request_sentiment='negative'
num_responses=3
import datetime
import requests
import json
data_output={}
d=datetime.date.today()-datetime.timedelta(days=4) 
d2=datetime.date.today()
date1='{:04d}-{:02d}-{:02d}'.format(d.year, d.month,d.day)
date2='{:04d}-{:02d}-{:02d}'.format(d2.year, d2.month,d2.day)
#print(date1,date2)
url = ('https://newsapi.org/v2/everything?'
       'q='+string+'&'
       'from='+date1+'&'
       'to='+date2+'&'
       'sortBy=relevancy&'
       'language=en&'
       'pageSize=100&'
       'apiKey=ef950cdea10e4b31a640905503ce0f7f')
response = requests.get(url).json()
print(response)

if request_sentiment=='negative':
  score_tag_ok=['N','N+']

if request_sentiment=='positive':
  score_tag_ok=['P','P+']

num_responses_done=0
for i in range( min(response['totalResults'],100)):
  content_use=response['articles'][i]['content']
  url_use=response['articles'][i]['url']
  url = "https://api.meaningcloud.com/sentiment-2.1"
  payload = 'key=392d0f95c397fd6ea87e283c49ed7afa&lang=en&url='+url_use
  headers = {'content-type': 'application/x-www-form-urlencoded'}
  response2 = requests.request("POST", url, data=payload, headers=headers).json()
  score_tag=0
  try:
    score_tag=response2['score_tag']
  except:
    pass
  if score_tag in score_tag_ok and num_responses_done<num_responses:
    print(score_tag,response['articles'][i]['title'], response['articles'][i]['url'])#,response2['irony'])
    data_output['title'+str(num_responses_done)]=response['articles'][i]['title']
    data_output['url'+str(num_responses_done)]=response['articles'][i]['url']
    num_responses_done=num_responses_done+1
  if num_responses_done>=num_responses:
    break

data_output['num_responses']=num_responses_done


with open('data.json', 'w') as outfile:
    json.dump(data_output, outfile)
