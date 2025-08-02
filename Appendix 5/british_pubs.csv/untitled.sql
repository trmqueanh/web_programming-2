select *
from weish_pubs;
select local_authority, count(*)
from weish_pubs
group by local_authority
order by count(*) desc;
